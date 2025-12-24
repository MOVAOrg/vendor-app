import { ThemedView } from '../../../components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

/**
 * Reviews & Ratings Screen - Manage customer reviews and ratings
 * View reviews, respond to feedback, and track rating performance
 */
export default function ReviewsRatingsScreen({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [reviews, setReviews] = useState([
    {
      id: '1',
      customerName: 'Rajesh Kumar',
      customerImage: null,
      rating: 5,
      review: 'Excellent service! The car was clean and well-maintained. The pickup and drop-off process was smooth. Highly recommended!',
      date: '2025-01-15',
      bookingId: 'MOV-12345',
      vehicleName: 'Honda City',
      response: null,
      responseDate: null,
      helpful: 12,
      verified: true,
    },
    {
      id: '2',
      customerName: 'Priya Sharma',
      customerImage: null,
      rating: 4,
      review: 'Good experience overall. The vehicle was in good condition and the booking process was easy. Minor delay in pickup but overall satisfied.',
      date: '2025-01-12',
      bookingId: 'MOV-12344',
      vehicleName: 'Maruti Swift',
      response: 'Thank you for your feedback! We apologize for the pickup delay and are working to improve our service.',
      responseDate: '2025-01-13',
      helpful: 8,
      verified: true,
    },
    {
      id: '3',
      customerName: 'Amit Patel',
      customerImage: null,
      rating: 3,
      review: 'Average experience. The car had some minor issues but was functional. The customer service could be better.',
      date: '2025-01-10',
      bookingId: 'MOV-12343',
      vehicleName: 'Toyota Innova',
      response: null,
      responseDate: null,
      helpful: 3,
      verified: false,
    },
    {
      id: '4',
      customerName: 'Sunita Reddy',
      customerImage: null,
      rating: 5,
      review: 'Outstanding service! The car was spotless and the staff was very professional. Will definitely book again.',
      date: '2025-01-08',
      bookingId: 'MOV-12342',
      vehicleName: 'Hyundai i20',
      response: 'Thank you for the wonderful review! We\'re delighted you had a great experience with us.',
      responseDate: '2025-01-09',
      helpful: 15,
      verified: true,
    },
    {
      id: '5',
      customerName: 'Vikram Singh',
      customerImage: null,
      rating: 2,
      review: 'Disappointed with the service. The car was not clean and had some mechanical issues. Customer support was unresponsive.',
      date: '2025-01-05',
      bookingId: 'MOV-12341',
      vehicleName: 'Ford EcoSport',
      response: 'We sincerely apologize for the poor experience. We have addressed the issues and improved our quality checks.',
      responseDate: '2025-01-06',
      helpful: 2,
      verified: true,
    },
  ]);

  const [ratingStats, setRatingStats] = useState({
    averageRating: 4.2,
    totalReviews: 127,
    ratingDistribution: {
      5: 45,
      4: 38,
      3: 25,
      2: 12,
      1: 7,
    },
    responseRate: 85,
    helpfulRate: 92,
  });

  const filters = [
    { key: 'all', label: 'All Reviews' },
    { key: '5', label: '5 Stars' },
    { key: '4', label: '4 Stars' },
    { key: '3', label: '3 Stars' },
    { key: '2', label: '2 Stars' },
    { key: '1', label: '1 Star' },
    { key: 'unresponded', label: 'Unresponded' },
  ];

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      // TODO: Implement actual API call to fetch reviews
      console.log('Loading reviews...');
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadReviews();
    setRefreshing(false);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const getFilteredReviews = () => {
    if (selectedFilter === 'all') {
      return reviews;
    } else if (selectedFilter === 'unresponded') {
      return reviews.filter(review => !review.response);
    } else {
      return reviews.filter(review => review.rating.toString() === selectedFilter);
    }
  };

  const renderStars = (rating: number, size: number = 16) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? "star" : "star-outline"}
        size={size}
        color="#FFD700"
        style={{ marginRight: 2 }}
      />
    ));
  };

  const handleRespondToReview = (review: any) => {
    navigation.navigate('RespondToReviewScreen', { review });
  };

  const handleReportReview = (review: any) => {
    Alert.alert(
      'Report Review',
      'Are you sure you want to report this review? It will be reviewed by our moderation team.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Report',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement report review API
            console.log('Reporting review:', review.id);
          },
        },
      ]
    );
  };

  const handleViewBooking = (bookingId: string) => {
    navigation.navigate('BookingDetailsScreen', { bookingId });
  };

  const renderReviewItem = ({ item }: { item: any }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.customerInfo}>
          <View style={styles.customerAvatar}>
            {item.customerImage ? (
              <View style={styles.customerImage}>
                {/* Customer image would go here */}
              </View>
            ) : (
              <Ionicons name="person" size={24} color="#007AFF" />
            )}
          </View>
          <View style={styles.customerDetails}>
            <View style={styles.customerNameRow}>
              <Text style={styles.customerName}>{item.customerName}</Text>
              {item.verified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={16} color="#34C759" />
                </View>
              )}
            </View>
            <View style={styles.ratingRow}>
              {renderStars(item.rating, 14)}
              <Text style={styles.ratingText}>{item.rating}/5</Text>
            </View>
          </View>
        </View>
        <View style={styles.reviewActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleReportReview(item)}
          >
            <Ionicons name="flag-outline" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.reviewText}>{item.review}</Text>

      <View style={styles.reviewMeta}>
        <TouchableOpacity
          style={styles.bookingInfo}
          onPress={() => handleViewBooking(item.bookingId)}
        >
          <Ionicons name="car-outline" size={14} color="#007AFF" />
          <Text style={styles.bookingText}>{item.vehicleName} • {item.bookingId}</Text>
        </TouchableOpacity>
        <Text style={styles.reviewDate}>{item.date}</Text>
      </View>

      {item.response ? (
        <View style={styles.responseSection}>
          <View style={styles.responseHeader}>
            <Text style={styles.responseLabel}>Your Response</Text>
            <Text style={styles.responseDate}>{item.responseDate}</Text>
          </View>
          <Text style={styles.responseText}>{item.response}</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.respondButton}
          onPress={() => handleRespondToReview(item)}
        >
          <Ionicons name="chatbubble-outline" size={16} color="#007AFF" />
          <Text style={styles.respondButtonText}>Respond to Review</Text>
        </TouchableOpacity>
      )}

      <View style={styles.reviewFooter}>
        <View style={styles.helpfulSection}>
          <Ionicons name="thumbs-up-outline" size={14} color="#666" />
          <Text style={styles.helpfulText}>{item.helpful} people found this helpful</Text>
        </View>
      </View>
    </View>
  );

  const renderFilterTab = (filter: any) => (
    <TouchableOpacity
      key={filter.key}
      style={[
        styles.filterTab,
        selectedFilter === filter.key && styles.activeFilterTab,
      ]}
      onPress={() => handleFilterChange(filter.key)}
    >
      <Text style={[
        styles.filterTabText,
        selectedFilter === filter.key && styles.activeFilterTabText,
      ]}>
        {filter.label}
      </Text>
    </TouchableOpacity>
  );

  const renderRatingBar = (rating: number, count: number, percentage: number) => (
    <View key={rating} style={styles.ratingBar}>
      <Text style={styles.ratingLabel}>{rating}</Text>
      <Ionicons name="star" size={12} color="#FFD700" />
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.ratingCount}>{count}</Text>
    </View>
  );

  const filteredReviews = getFilteredReviews();

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={[{ key: 'content' }]}
        renderItem={() => (
          <View>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Reviews & Ratings</Text>
              <TouchableOpacity style={styles.moreButton}>
                <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Rating Summary */}
            <View style={styles.ratingSummaryCard}>
              <View style={styles.ratingOverview}>
                <Text style={styles.averageRating}>{ratingStats.averageRating}</Text>
                <View style={styles.starsContainer}>
                  {renderStars(Math.round(ratingStats.averageRating), 20)}
                </View>
                <Text style={styles.totalReviews}>{ratingStats.totalReviews} reviews</Text>
              </View>

              <View style={styles.ratingBars}>
                {Object.entries(ratingStats.ratingDistribution).map(([rating, count]) => {
                  const percentage = (count / ratingStats.totalReviews) * 100;
                  return renderRatingBar(parseInt(rating), count, percentage);
                })}
              </View>
            </View>

            {/* Stats Cards */}
            <View style={styles.statsCards}>
              <View style={styles.statCard}>
                <Ionicons name="chatbubble-outline" size={24} color="#007AFF" />
                <Text style={styles.statValue}>{ratingStats.responseRate}%</Text>
                <Text style={styles.statLabel}>Response Rate</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="thumbs-up-outline" size={24} color="#34C759" />
                <Text style={styles.statValue}>{ratingStats.helpfulRate}%</Text>
                <Text style={styles.statLabel}>Helpful Rate</Text>
              </View>
            </View>

            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
              <FlatList
                data={filters}
                renderItem={({ item }) => renderFilterTab(item)}
                keyExtractor={(item) => item.key}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterList}
              />
            </View>

            {/* Reviews List */}
            <View style={styles.reviewsSection}>
              <Text style={styles.sectionTitle}>
                Reviews ({filteredReviews.length})
              </Text>
              {filteredReviews.length > 0 ? (
                <FlatList
                  data={filteredReviews}
                  renderItem={renderReviewItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <View style={styles.emptyState}>
                  <Ionicons name="star-outline" size={64} color="#C7C7CC" />
                  <Text style={styles.emptyTitle}>No reviews found</Text>
                  <Text style={styles.emptyMessage}>
                    No reviews match your current filter
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.key}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  moreButton: {
    padding: 8,
  },
  ratingSummaryCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  ratingOverview: {
    alignItems: 'center',
    marginBottom: 20,
  },
  averageRating: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  totalReviews: {
    fontSize: 14,
    color: '#666',
  },
  ratingBars: {
    gap: 8,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingLabel: {
    fontSize: 12,
    color: '#666',
    width: 16,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E5EA',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 3,
  },
  ratingCount: {
    fontSize: 12,
    color: '#666',
    width: 30,
    textAlign: 'right',
  },
  statsCards: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterList: {
    paddingRight: 20,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    marginRight: 8,
  },
  activeFilterTab: {
    backgroundColor: '#007AFF',
  },
  filterTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  reviewsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  reviewCard: {
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
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  customerInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  customerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  customerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E5EA',
  },
  customerDetails: {
    flex: 1,
  },
  customerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  verifiedBadge: {
    marginLeft: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  reviewActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 4,
  },
  reviewText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingText: {
    fontSize: 12,
    color: '#007AFF',
    marginLeft: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
  },
  responseSection: {
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  responseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  responseLabel: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  responseDate: {
    fontSize: 12,
    color: '#666',
  },
  responseText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 18,
  },
  respondButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 12,
  },
  respondButtonText: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 6,
    fontWeight: '500',
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  helpfulSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpfulText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
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
});
