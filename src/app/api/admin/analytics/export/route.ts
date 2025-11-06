import { NextResponse } from 'next/server';
import { getAnalyticsData } from '@/lib/services/analytics';

export async function GET() {
  try {
    const data = await getAnalyticsData();
    
    // Convert data to CSV format
    let csv = 'Type,Metric,Value\n';
    
    // Add traffic data
    data.trafficData.forEach(item => {
      csv += `Traffic,${item.name},${item.visits}\n`;
    });
    
    // Add engagement data
    data.engagementData.forEach(item => {
      csv += `Engagement,${item.name},${item.value}\n`;
    });
    
    // Add stats
    Object.entries(data.stats).forEach(([key, value]) => {
      csv += `Stat,${key},${value}\n`;
    });
    
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="analytics-export.csv"'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to export analytics data' },
      { status: 500 }
    );
  }
}
