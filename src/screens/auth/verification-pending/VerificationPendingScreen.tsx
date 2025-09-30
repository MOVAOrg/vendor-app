import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Verification Pending Screen Component
 * Shows verification status while admin reviews vendor application
 * Displays progress and estimated timeline
 */
export default function VerificationPendingScreen({ navigation }: any) {
  const [estimatedTime, setEstimatedTime] = useState('24-48 hours');

  useEffect(() => {
    // TODO: Check verification status from backend
    // If verified, navigate to dashboard
    // If rejected, navigate to rejection screen
  }, []);

  const handleContactSupport = () => {
    // TODO: Open support contact (email, phone, or chat)
    console.log('Contact support');
  };

  const handleCheckStatus = () => {
    // TODO: Check verification status from backend
    console.log('Check verification status');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Verification Icon */}
        <View style={styles.iconContainer}>
          <Image
            source={require('../../../assets/images/verification-pending.png')} // TODO: Add actual image
            style={styles.verificationIcon}
            resizeMode="contain"
          />
        </View>

        {/* Status Content */}
        <View style={styles.statusContainer}>
          <Text style={styles.title}>Verification in Progress</Text>
          <Text style={styles.subtitle}>
            Your vendor application is currently under review. Our team will verify your documents and business details.
          </Text>
        </View>

        {/* Timeline */}
        <View style={styles.timelineContainer}>
          <Text style={styles.timelineTitle}>What happens next?</Text>

          <View style={styles.timelineItem}>
            <View style={styles.timelineIcon}>
              <Text style={styles.timelineNumber}>1</Text>
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineStep}>Document Review</Text>
              <Text style={styles.timelineDescription}>
                We're reviewing your trade license and business documents
              </Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={[styles.timelineIcon, styles.timelineIconPending]}>
              <Text style={styles.timelineNumber}>2</Text>
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineStep}>Background Check</Text>
              <Text style={styles.timelineDescription}>
                Verifying your business credentials and references
              </Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={[styles.timelineIcon, styles.timelineIconPending]}>
              <Text style={styles.timelineNumber}>3</Text>
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineStep}>Approval</Text>
              <Text style={styles.timelineDescription}>
                You'll receive notification once approved
              </Text>
            </View>
          </View>
        </View>

        {/* Estimated Time */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeTitle}>Estimated Processing Time</Text>
          <Text style={styles.timeValue}>{estimatedTime}</Text>
          <Text style={styles.timeNote}>
            We'll notify you via SMS and email once verification is complete
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.checkStatusButton} onPress={handleCheckStatus}>
            <Text style={styles.checkStatusButtonText}>Check Status</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportButton} onPress={handleContactSupport}>
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            While you wait, you can prepare your vehicle listings and business profile to get started quickly once approved.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  verificationIcon: {
    width: 120,
    height: 120,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'OpenSans-Regular',
  },
  timelineContainer: {
    marginBottom: 32,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  timelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  timelineIconPending: {
    backgroundColor: '#E0E0E0',
  },
  timelineNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  timelineContent: {
    flex: 1,
  },
  timelineStep: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
    fontFamily: 'OpenSans-SemiBold',
  },
  timelineDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    fontFamily: 'OpenSans-Regular',
  },
  timeContainer: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  timeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    fontFamily: 'OpenSans-SemiBold',
  },
  timeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
    fontFamily: 'Montserrat-Bold',
  },
  timeNote: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
  },
  buttonContainer: {
    marginBottom: 24,
  },
  checkStatusButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  checkStatusButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
  supportButton: {
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
  },
  supportButtonText: {
    color: '#666666',
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
  },
  infoContainer: {
    backgroundColor: '#FFF3CD',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  infoText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
    fontFamily: 'OpenSans-Regular',
  },
});
