import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

/**
 * Reports Screen - Generate and download business reports
 * Provides various report types with customization options
 */
export default function ReportsScreen() {
  const [selectedReportType, setSelectedReportType] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });
  const [reportFormat, setReportFormat] = useState('pdf');
  const [loading, setLoading] = useState(false);

  // Report types available
  const reportTypes = [
    {
      id: 'booking',
      title: 'Booking Report',
      description: 'All bookings with details, status, amounts, customers',
      icon: 'calendar-outline',
      color: '#007AFF',
    },
    {
      id: 'revenue',
      title: 'Revenue Report',
      description: 'Detailed earnings breakdown, vehicle-wise, date-wise',
      icon: 'cash-outline',
      color: '#34C759',
    },
    {
      id: 'tax',
      title: 'Tax Report',
      description: 'GST invoices, TDS deductions, annual statement',
      icon: 'receipt-outline',
      color: '#FF9500',
    },
    {
      id: 'vehicle',
      title: 'Vehicle Performance Report',
      description: 'Each vehicle metrics, utilization, revenue, ratings',
      icon: 'car-outline',
      color: '#AF52DE',
    },
    {
      id: 'customer',
      title: 'Customer Report',
      description: 'Customer list with booking history, repeat customers',
      icon: 'people-outline',
      color: '#FF3B30',
    },
  ];

  // Recent reports
  const recentReports = [
    {
      id: '1',
      type: 'Revenue Report',
      dateRange: 'Jan 1 - Jan 31, 2025',
      format: 'PDF',
      generatedAt: '2 days ago',
      size: '2.4 MB',
    },
    {
      id: '2',
      type: 'Booking Report',
      dateRange: 'Dec 1 - Dec 31, 2024',
      format: 'Excel',
      generatedAt: '1 week ago',
      size: '1.8 MB',
    },
  ];

  // Handle report type selection
  const handleReportTypeSelect = (reportId: string) => {
    setSelectedReportType(reportId);
  };

  // Handle date range selection
  const handleDateRangeSelect = () => {
    Alert.alert(
      'Select Date Range',
      'Choose the date range for your report',
      [
        { text: 'Last 7 days', onPress: () => setDateRange({ startDate: '7 days ago', endDate: 'Today' }) },
        { text: 'Last 30 days', onPress: () => setDateRange({ startDate: '30 days ago', endDate: 'Today' }) },
        { text: 'Last 3 months', onPress: () => setDateRange({ startDate: '3 months ago', endDate: 'Today' }) },
        { text: 'Custom Range', onPress: () => {
          // TODO: Open date picker
          console.log('Open custom date picker');
        }},
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Handle format selection
  const handleFormatSelect = () => {
    Alert.alert(
      'Select Format',
      'Choose the export format for your report',
      [
        { text: 'PDF', onPress: () => setReportFormat('pdf') },
        { text: 'Excel', onPress: () => setReportFormat('excel') },
        { text: 'CSV', onPress: () => setReportFormat('csv') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Generate report
  const generateReport = async () => {
    if (!selectedReportType) {
      Alert.alert('Error', 'Please select a report type');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement actual API call to generate report
      // const report = await reportsService.generateReport({
      //   type: selectedReportType,
      //   dateRange,
      //   format: reportFormat,
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Report Generated',
        'Your report has been generated successfully and will be emailed to you.',
        [
          { text: 'OK', onPress: () => {
            // TODO: Navigate to download or show download link
            console.log('Report generated successfully');
          }}
        ]
      );
    } catch (error) {
      console.error('Error generating report:', error);
      Alert.alert('Error', 'Failed to generate report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Download recent report
  const downloadReport = (reportId: string) => {
    Alert.alert(
      'Download Report',
      'Download this report to your device?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Download',
          onPress: () => {
            // TODO: Implement report download
            console.log('Download report:', reportId);
          }
        }
      ]
    );
  };

  // Setup scheduled report
  const setupScheduledReport = () => {
    Alert.alert(
      'Setup Scheduled Reports',
      'Automatically receive reports via email',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Setup',
          onPress: () => {
            // TODO: Navigate to scheduled reports setup
            console.log('Setup scheduled reports');
          }
        }
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reports</Text>
        </View>

        {/* Report Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Generate New Report</Text>
          <Text style={styles.sectionSubtitle}>
            Select a report type and customize your options
          </Text>

          {reportTypes.map((report) => (
            <TouchableOpacity
              key={report.id}
              style={[
                styles.reportTypeCard,
                selectedReportType === report.id && styles.selectedReportType,
              ]}
              onPress={() => handleReportTypeSelect(report.id)}
            >
              <View style={[styles.reportIcon, { backgroundColor: report.color }]}>
                <Ionicons name={report.icon} size={24} color="#FFFFFF" />
              </View>
              <View style={styles.reportContent}>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportDescription}>{report.description}</Text>
              </View>
              {selectedReportType === report.id && (
                <Ionicons name="checkmark-circle" size={24} color="#34C759" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Report Options */}
        {selectedReportType && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Report Options</Text>

            {/* Date Range */}
            <TouchableOpacity style={styles.optionCard} onPress={handleDateRangeSelect}>
              <View style={styles.optionIcon}>
                <Ionicons name="calendar-outline" size={20} color="#666" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Date Range</Text>
                <Text style={styles.optionValue}>
                  {dateRange.startDate && dateRange.endDate
                    ? `${dateRange.startDate} - ${dateRange.endDate}`
                    : 'Select date range'
                  }
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
            </TouchableOpacity>

            {/* Format */}
            <TouchableOpacity style={styles.optionCard} onPress={handleFormatSelect}>
              <View style={styles.optionIcon}>
                <Ionicons name="document-outline" size={20} color="#666" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Format</Text>
                <Text style={styles.optionValue}>
                  {reportFormat.toUpperCase()}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
            </TouchableOpacity>

            {/* Custom Options based on report type */}
            {selectedReportType === 'booking' && (
              <View style={styles.customOptions}>
                <Text style={styles.customOptionsTitle}>Additional Options:</Text>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity style={styles.checkbox}>
                    <Ionicons name="checkmark" size={16} color="#34C759" />
                  </TouchableOpacity>
                  <Text style={styles.checkboxText}>Include customer details</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity style={styles.checkbox}>
                    <Ionicons name="checkmark" size={16} color="#34C759" />
                  </TouchableOpacity>
                  <Text style={styles.checkboxText}>Include payment status</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity style={styles.checkbox}>
                    <Ionicons name="checkmark" size={16} color="#34C759" />
                  </TouchableOpacity>
                  <Text style={styles.checkboxText}>Include vehicle details</Text>
                </View>
              </View>
            )}

            {/* Generate Button */}
            <TouchableOpacity
              style={[styles.generateButton, loading && styles.generateButtonDisabled]}
              onPress={generateReport}
              disabled={loading}
            >
              <Ionicons name="download-outline" size={20} color="#FFFFFF" />
              <Text style={styles.generateButtonText}>
                {loading ? 'Generating...' : 'Generate Report'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Recent Reports */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Reports</Text>
          <Text style={styles.sectionSubtitle}>
            Your recently generated reports
          </Text>

          {recentReports.map((report) => (
            <TouchableOpacity
              key={report.id}
              style={styles.recentReportCard}
              onPress={() => downloadReport(report.id)}
            >
              <View style={styles.reportIcon}>
                <Ionicons name="document-text-outline" size={24} color="#007AFF" />
              </View>
              <View style={styles.reportContent}>
                <Text style={styles.reportTitle}>{report.type}</Text>
                <Text style={styles.reportDescription}>{report.dateRange}</Text>
                <Text style={styles.reportDetails}>
                  {report.format} • {report.size} • {report.generatedAt}
                </Text>
              </View>
              <TouchableOpacity style={styles.downloadButton}>
                <Ionicons name="download-outline" size={20} color="#007AFF" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Scheduled Reports */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scheduled Reports</Text>
          <Text style={styles.sectionSubtitle}>
            Automatically receive reports via email
          </Text>

          <TouchableOpacity style={styles.scheduledCard} onPress={setupScheduledReport}>
            <View style={styles.scheduledIcon}>
              <Ionicons name="time-outline" size={24} color="#007AFF" />
            </View>
            <View style={styles.scheduledContent}>
              <Text style={styles.scheduledTitle}>Setup Auto-Reports</Text>
              <Text style={styles.scheduledDescription}>
                Receive weekly/monthly reports automatically
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </TouchableOpacity>
        </View>

        {/* Report Templates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Templates</Text>
          <Text style={styles.sectionSubtitle}>
            Generate reports using pre-configured templates
          </Text>

          <View style={styles.templatesContainer}>
            <TouchableOpacity style={styles.templateCard}>
              <Ionicons name="business-outline" size={20} color="#007AFF" />
              <Text style={styles.templateText}>Monthly Summary</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.templateCard}>
              <Ionicons name="analytics-outline" size={20} color="#34C759" />
              <Text style={styles.templateText}>Performance Report</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.templateCard}>
              <Ionicons name="receipt-outline" size={20} color="#FF9500" />
              <Text style={styles.templateText}>Tax Summary</Text>
            </TouchableOpacity>
          </View>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 20,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  reportTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedReportType: {
    backgroundColor: '#F8F9FF',
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  reportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  reportContent: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 14,
    color: '#666',
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionIcon: {
    width: 24,
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 2,
  },
  optionValue: {
    fontSize: 14,
    color: '#666',
  },
  customOptions: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8F9FA',
  },
  customOptionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#34C759',
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxText: {
    fontSize: 14,
    color: '#000',
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  generateButtonDisabled: {
    opacity: 0.5,
  },
  generateButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  recentReportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  reportDetails: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  downloadButton: {
    padding: 8,
  },
  scheduledCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  scheduledIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  scheduledContent: {
    flex: 1,
  },
  scheduledTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  scheduledDescription: {
    fontSize: 14,
    color: '#666',
  },
  templatesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  templateCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  templateText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 40,
  },
});
