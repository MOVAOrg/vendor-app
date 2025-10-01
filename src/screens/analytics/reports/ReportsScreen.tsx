import { ThemedView } from '../../components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Reports Screen - Generate and view business reports
 * Provides comprehensive reporting tools for business analysis
 */
export default function ReportsScreen({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('revenue');

  const periods = [
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
    { key: 'quarter', label: 'Quarter' },
    { key: 'year', label: 'Year' },
  ];

  const reportTypes = [
    {
      id: '1',
      name: 'Revenue Report',
      description: 'Detailed breakdown of all revenue streams',
      icon: 'cash-outline',
      color: '#34C759',
      lastGenerated: '2025-01-18',
      status: 'ready',
    },
    {
      id: '2',
      name: 'Booking Analytics',
      description: 'Booking patterns, trends, and performance metrics',
      icon: 'calendar-outline',
      color: '#007AFF',
      lastGenerated: '2025-01-17',
      status: 'ready',
    },
    {
      id: '3',
      name: 'Vehicle Performance',
      description: 'Individual vehicle utilization and earnings',
      icon: 'car-outline',
      color: '#FF9500',
      lastGenerated: '2025-01-16',
      status: 'ready',
    },
    {
      id: '4',
      name: 'Customer Analysis',
      description: 'Customer behavior, retention, and satisfaction',
      icon: 'people-outline',
      color: '#5856D6',
      lastGenerated: '2025-01-15',
      status: 'ready',
    },
    {
      id: '5',
      name: 'Financial Summary',
      description: 'Complete financial overview with P&L',
      icon: 'pie-chart-outline',
      color: '#AF52DE',
      lastGenerated: '2025-01-14',
      status: 'ready',
    },
    {
      id: '6',
      name: 'Maintenance Report',
      description: 'Vehicle maintenance costs and schedules',
      icon: 'construct-outline',
      color: '#FF3B30',
      lastGenerated: '2025-01-13',
      status: 'ready',
    },
    {
      id: '7',
      name: 'Tax Report',
      description: 'Tax calculations and GST summaries',
      icon: 'receipt-outline',
      color: '#8E8E93',
      lastGenerated: '2025-01-12',
      status: 'ready',
    },
    {
      id: '8',
      name: 'Commission Analysis',
      description: 'Platform commission and fee breakdown',
      icon: 'percent-outline',
      color: '#FF2D92',
      lastGenerated: '2025-01-11',
      status: 'ready',
    },
  ];

  const quickStats = [
    {
      title: 'Total Revenue',
      value: '₹2,45,680',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'trending-up-outline',
    },
    {
      title: 'Total Bookings',
      value: '127',
      change: '+8.3%',
      changeType: 'positive',
      icon: 'calendar-outline',
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      changeType: 'positive',
      icon: 'star-outline',
    },
    {
      title: 'Active Vehicles',
      value: '8',
      change: '0',
      changeType: 'neutral',
      icon: 'car-outline',
    },
  ];

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      // TODO: Implement actual API call to fetch reports
      console.log('Loading reports...');
    } catch (error) {
      console.error('Error loading reports:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadReports();
    setRefreshing(false);
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  const handleGenerateReport = (report: any) => {
    Alert.alert(
      'Generate Report',
      `Generate ${report.name} for ${selectedPeriod}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Generate',
          onPress: () => {
            // TODO: Implement actual report generation
            console.log('Generating report:', report.name, 'for period:', selectedPeriod);

            Alert.alert(
              'Report Generated',
              `${report.name} has been generated successfully.`,
              [
                {
                  text: 'View Report',
                  onPress: () => navigation.navigate('ReportDetailScreen', {
                    reportId: report.id,
                    reportName: report.name,
                    period: selectedPeriod
                  }),
                },
                { text: 'OK', style: 'default' },
              ]
            );
          },
        },
      ]
    );
  };

  const handleDownloadReport = (report: any) => {
    Alert.alert(
      'Download Report',
      `Download ${report.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Download',
          onPress: () => {
            // TODO: Implement actual download
            console.log('Downloading report:', report.name);
          },
        },
      ]
    );
  };

  const handleScheduleReport = () => {
    navigation.navigate('ScheduleReportScreen');
  };

  const renderPeriodTab = (period: any) => (
    <TouchableOpacity
      key={period.key}
      style={[
        styles.periodTab,
        selectedPeriod === period.key && styles.selectedPeriodTab,
      ]}
      onPress={() => handlePeriodChange(period.key)}
    >
      <Text style={[
        styles.periodTabText,
        selectedPeriod === period.key && styles.selectedPeriodTabText,
      ]}>
        {period.label}
      </Text>
    </TouchableOpacity>
  );

  const renderQuickStat = (stat: any) => (
    <View key={stat.title} style={styles.quickStatCard}>
      <View style={styles.statHeader}>
        <Ionicons name={stat.icon} size={20} color="#007AFF" />
        <Text style={styles.statChange} data-change-type={stat.changeType}>
          {stat.change}
        </Text>
      </View>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statTitle}>{stat.title}</Text>
    </View>
  );

  const renderReportItem = ({ item }: { item: any }) => (
    <View style={styles.reportCard}>
      <View style={styles.reportHeader}>
        <View style={styles.reportInfo}>
          <View style={[styles.reportIcon, { backgroundColor: item.color + '20' }]}>
            <Ionicons name={item.icon} size={24} color={item.color} />
          </View>
          <View style={styles.reportDetails}>
            <Text style={styles.reportName}>{item.name}</Text>
            <Text style={styles.reportDescription}>{item.description}</Text>
            <Text style={styles.lastGenerated}>
              Last generated: {item.lastGenerated}
            </Text>
          </View>
        </View>
        <View style={styles.reportStatus}>
          <View style={[
            styles.statusBadge,
            { backgroundColor: item.status === 'ready' ? '#34C759' : '#FF9500' }
          ]}>
            <Text style={styles.statusText}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.reportActions}>
        <TouchableOpacity
          style={styles.generateButton}
          onPress={() => handleGenerateReport(item)}
        >
          <Ionicons name="play-outline" size={16} color="#FFFFFF" />
          <Text style={styles.generateButtonText}>Generate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() => handleDownloadReport(item)}
        >
          <Ionicons name="download-outline" size={16} color="#007AFF" />
          <Text style={styles.downloadButtonText}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reports</Text>
          <TouchableOpacity style={styles.scheduleButton} onPress={handleScheduleReport}>
            <Ionicons name="calendar-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSection}>
          <Text style={styles.sectionTitle}>Select Period</Text>
          <View style={styles.periodTabs}>
            {periods.map(renderPeriodTab)}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Quick Overview</Text>
          <View style={styles.quickStatsGrid}>
            {quickStats.map(renderQuickStat)}
          </View>
        </View>

        {/* Reports List */}
        <View style={styles.reportsSection}>
          <Text style={styles.sectionTitle}>Available Reports</Text>
          <FlatList
            data={reportTypes}
            renderItem={renderReportItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Report Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.bulkActionButton}>
            <Ionicons name="document-text-outline" size={20} color="#007AFF" />
            <Text style={styles.bulkActionButtonText}>Generate All Reports</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bulkActionButton}>
            <Ionicons name="download-outline" size={20} color="#007AFF" />
            <Text style={styles.bulkActionButtonText}>Download All Reports</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  scheduleButton: {
    padding: 8,
  },
  periodSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  periodTabs: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 4,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedPeriodTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  periodTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedPeriodTabText: {
    color: '#000',
    fontWeight: '600',
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickStatCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
    color: '#34C759',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
  },
  reportsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  reportInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  reportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reportDetails: {
    flex: 1,
  },
  reportName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  lastGenerated: {
    fontSize: 12,
    color: '#999',
  },
  reportStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  reportActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  generateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 8,
  },
  generateButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 6,
  },
  downloadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  downloadButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 6,
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  bulkActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  bulkActionButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomSpacer: {
    height: 40,
  },
});
