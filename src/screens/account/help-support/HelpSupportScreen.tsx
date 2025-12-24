import { ThemedView } from '../../../components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * Help & Support Screen - Customer support and help center
 * Provides FAQs, contact options, and ticket submission
 */
export default function HelpSupportScreen({ navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketPriority, setTicketPriority] = useState('medium');

  const categories = [
    { key: 'general', label: 'General', icon: 'help-circle-outline' },
    { key: 'booking', label: 'Bookings', icon: 'calendar-outline' },
    { key: 'payment', label: 'Payments', icon: 'card-outline' },
    { key: 'vehicle', label: 'Vehicle', icon: 'car-outline' },
    { key: 'account', label: 'Account', icon: 'person-outline' },
    { key: 'technical', label: 'Technical', icon: 'settings-outline' },
  ];

  const faqs = [
    {
      id: '1',
      category: 'general',
      question: 'How do I create a new booking?',
      answer: 'To create a new booking, go to the Bookings tab and tap the "+" button. Select your vehicle, choose dates, and confirm the booking details.',
      helpful: true,
    },
    {
      id: '2',
      category: 'payment',
      question: 'How long does it take to receive payments?',
      answer: 'Payments are typically processed within 1-2 business days. You can track your payment status in the Wallet section.',
      helpful: true,
    },
    {
      id: '3',
      category: 'booking',
      question: 'Can I cancel a booking?',
      answer: 'Yes, you can cancel bookings through the My Bookings screen. Cancellation policies may apply based on timing.',
      helpful: false,
    },
    {
      id: '4',
      category: 'vehicle',
      question: 'How do I add a new vehicle to my fleet?',
      answer: 'Navigate to Fleet Management and tap "Add Vehicle". Follow the step-by-step process to add vehicle details, photos, and documents.',
      helpful: true,
    },
    {
      id: '5',
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'Go to Profile > Edit Profile to update your personal and business information. Changes may require verification.',
      helpful: false,
    },
    {
      id: '6',
      category: 'technical',
      question: 'The app is not loading properly. What should I do?',
      answer: 'Try restarting the app, clearing cache, or updating to the latest version. If issues persist, contact technical support.',
      helpful: true,
    },
  ];

  const contactOptions = [
    {
      id: '1',
      type: 'phone',
      title: 'Call Support',
      subtitle: '+91 1800-123-4567',
      description: 'Available 24/7 for urgent issues',
      icon: 'call-outline',
      color: '#34C759',
    },
    {
      id: '2',
      type: 'email',
      title: 'Email Support',
      subtitle: 'support@mova.com',
      description: 'Response within 24 hours',
      icon: 'mail-outline',
      color: '#007AFF',
    },
    {
      id: '3',
      type: 'chat',
      title: 'Live Chat',
      subtitle: 'Chat with support agent',
      description: 'Available 9 AM - 6 PM',
      icon: 'chatbubble-outline',
      color: '#FF9500',
    },
    {
      id: '4',
      type: 'whatsapp',
      title: 'WhatsApp',
      subtitle: '+91 98765 43210',
      description: 'Quick support via WhatsApp',
      icon: 'logo-whatsapp',
      color: '#25D366',
    },
  ];

  const getFilteredFAQs = () => {
    let filtered = faqs.filter(faq => faq.category === selectedCategory);

    if (searchQuery) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleContactOption = (option: any) => {
    switch (option.type) {
      case 'phone':
        Alert.alert('Call Support', `Call ${option.subtitle}?`, [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Call', onPress: () => console.log('Calling support') },
        ]);
        break;
      case 'email':
        Alert.alert('Email Support', `Send email to ${option.subtitle}?`, [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Send', onPress: () => console.log('Opening email') },
        ]);
        break;
      case 'chat':
        Alert.alert('Live Chat', 'Start a live chat session?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Start Chat', onPress: () => console.log('Starting chat') },
        ]);
        break;
      case 'whatsapp':
        Alert.alert('WhatsApp Support', `Open WhatsApp chat with ${option.subtitle}?`, [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open WhatsApp', onPress: () => console.log('Opening WhatsApp') },
        ]);
        break;
    }
  };

  const handleSubmitTicket = () => {
    if (!ticketSubject.trim() || !ticketDescription.trim()) {
      Alert.alert('Missing Information', 'Please fill in both subject and description.');
      return;
    }

    Alert.alert(
      'Submit Support Ticket',
      'Are you sure you want to submit this support ticket?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit',
          onPress: () => {
            // TODO: Implement actual ticket submission
            console.log('Submitting ticket:', {
              subject: ticketSubject,
              description: ticketDescription,
              priority: ticketPriority,
            });

            Alert.alert(
              'Ticket Submitted',
              'Your support ticket has been submitted successfully. You will receive a response within 24 hours.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    setTicketSubject('');
                    setTicketDescription('');
                    setTicketPriority('medium');
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const renderFAQItem = ({ item }: { item: any }) => (
    <View style={styles.faqItem}>
      <Text style={styles.faqQuestion}>{item.question}</Text>
      <Text style={styles.faqAnswer}>{item.answer}</Text>
      <View style={styles.faqActions}>
        <TouchableOpacity style={styles.helpfulButton}>
          <Ionicons
            name={item.helpful ? "thumbs-up" : "thumbs-up-outline"}
            size={16}
            color={item.helpful ? "#34C759" : "#666"}
          />
          <Text style={[
            styles.helpfulText,
            { color: item.helpful ? "#34C759" : "#666" }
          ]}>
            {item.helpful ? "Helpful" : "Was this helpful?"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContactOption = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.contactOption}
      onPress={() => handleContactOption(item)}
    >
      <View style={[styles.contactIcon, { backgroundColor: item.color + '20' }]}>
        <Ionicons name={item.icon} size={24} color={item.color} />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>{item.title}</Text>
        <Text style={styles.contactSubtitle}>{item.subtitle}</Text>
        <Text style={styles.contactDescription}>{item.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
    </TouchableOpacity>
  );

  const renderCategory = (category: any) => (
    <TouchableOpacity
      key={category.key}
      style={[
        styles.categoryButton,
        selectedCategory === category.key && styles.selectedCategoryButton,
      ]}
      onPress={() => handleCategoryChange(category.key)}
    >
      <Ionicons
        name={category.icon}
        size={20}
        color={selectedCategory === category.key ? '#FFFFFF' : '#666'}
      />
      <Text style={[
        styles.categoryText,
        selectedCategory === category.key && styles.selectedCategoryText,
      ]}>
        {category.label}
      </Text>
    </TouchableOpacity>
  );

  const filteredFAQs = getFilteredFAQs();

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help & Support</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search help articles..."
              placeholderTextColor="#C7C7CC"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          >
            {categories.map(renderCategory)}
          </ScrollView>
        </View>

        {/* FAQs */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>
            Frequently Asked Questions ({filteredFAQs.length})
          </Text>
          {filteredFAQs.length > 0 ? (
            <FlatList
              data={filteredFAQs}
              renderItem={renderFAQItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="help-circle-outline" size={48} color="#C7C7CC" />
              <Text style={styles.emptyTitle}>No FAQs found</Text>
              <Text style={styles.emptyMessage}>
                Try a different category or search term
              </Text>
            </View>
          )}
        </View>

        {/* Contact Options */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          <FlatList
            data={contactOptions}
            renderItem={renderContactOption}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Submit Ticket */}
        <View style={styles.ticketSection}>
          <Text style={styles.sectionTitle}>Submit Support Ticket</Text>
          <View style={styles.ticketForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Subject</Text>
              <TextInput
                style={styles.textInput}
                value={ticketSubject}
                onChangeText={setTicketSubject}
                placeholder="Brief description of your issue"
                placeholderTextColor="#C7C7CC"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Priority</Text>
              <View style={styles.prioritySelector}>
                {['low', 'medium', 'high'].map(priority => (
                  <TouchableOpacity
                    key={priority}
                    style={[
                      styles.priorityButton,
                      ticketPriority === priority && styles.selectedPriorityButton,
                    ]}
                    onPress={() => setTicketPriority(priority)}
                  >
                    <Text style={[
                      styles.priorityButtonText,
                      ticketPriority === priority && styles.selectedPriorityButtonText,
                    ]}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={styles.textArea}
                value={ticketDescription}
                onChangeText={setTicketDescription}
                placeholder="Please provide detailed information about your issue..."
                multiline
                numberOfLines={4}
                placeholderTextColor="#C7C7CC"
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitTicket}>
              <Text style={styles.submitButtonText}>Submit Ticket</Text>
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
  placeholder: {
    width: 40,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
    marginRight: 8,
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  categoriesList: {
    paddingRight: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  faqSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  faqActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
  },
  helpfulText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  contactSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 2,
  },
  contactDescription: {
    fontSize: 12,
    color: '#666',
  },
  ticketSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  ticketForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  prioritySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  selectedPriorityButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  priorityButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedPriorityButtonText: {
    color: '#FFFFFF',
  },
  textArea: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 40,
  },
});
