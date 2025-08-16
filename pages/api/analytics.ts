import type { NextApiRequest, NextApiResponse } from 'next';

interface AnalyticsEvent {
  type: string;
  timestamp: number;
  data: any;
  sessionId: string;
  userId?: string;
}

interface AnalyticsResponse {
  success: boolean;
  message: string;
  eventId?: string;
  timestamp: number;
}

// In-memory storage for development (in production, use database)
let analyticsEvents: AnalyticsEvent[] = [];
let sessionData: Map<string, any> = new Map();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnalyticsResponse>
) {
  if (req.method === 'POST') {
    try {
      const event: AnalyticsEvent = req.body;
      
      // Validate event data
      if (!event.type || !event.timestamp || !event.sessionId) {
        return res.status(400).json({
          success: false,
          message: 'Invalid event data',
          timestamp: Date.now()
        });
      }

      // Add event to storage
      analyticsEvents.push(event);
      
      // Update session data
      if (!sessionData.has(event.sessionId)) {
        sessionData.set(event.sessionId, {
          id: event.sessionId,
          events: [],
          startTime: event.timestamp,
          lastActivity: event.timestamp
        });
      }
      
      const session = sessionData.get(event.sessionId);
      session.events.push(event);
      session.lastActivity = event.timestamp;
      
      // Limit storage size (in production, use database with proper cleanup)
      if (analyticsEvents.length > 10000) {
        analyticsEvents = analyticsEvents.slice(-5000);
      }

      // Generate unique event ID
      const eventId = `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Log event in development
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Analytics Event Received:', {
          id: eventId,
          type: event.type,
          sessionId: event.sessionId,
          timestamp: new Date(event.timestamp).toISOString()
        });
      }

      res.status(200).json({
        success: true,
        message: 'Event tracked successfully',
        eventId,
        timestamp: Date.now()
      });

    } catch (error) {
      console.error('Analytics API Error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        timestamp: Date.now()
      });
    }
  } else if (req.method === 'GET') {
    // Return analytics summary (for development/testing)
    const query = req.query;
    
    if (query.summary === 'true') {
      const summary = {
        totalEvents: analyticsEvents.length,
        totalSessions: sessionData.size,
        eventsByType: analyticsEvents.reduce((acc, event) => {
          acc[event.type] = (acc[event.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        recentEvents: analyticsEvents.slice(-10),
        sessionStats: Array.from(sessionData.values()).map(session => ({
          id: session.id,
          eventCount: session.events.length,
          duration: session.lastActivity - session.startTime,
          lastActivity: session.lastActivity
        }))
      };

      return res.status(200).json({
        success: true,
        message: 'Analytics summary retrieved',
        data: summary,
        timestamp: Date.now()
      } as any);
    }

    res.status(405).json({
      success: false,
      message: 'Method not allowed',
      timestamp: Date.now()
    });
  } else {
    res.status(405).json({
      success: false,
      message: 'Method not allowed',
      timestamp: Date.now()
    });
  }
}

// Export for server-side usage
export { analyticsEvents, sessionData };
