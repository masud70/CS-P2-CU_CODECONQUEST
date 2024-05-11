import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: 'Hemayetpur Cleanup Drive',
      description: 'Join us for a day of cleaning up our local beaches and promoting environmental conservation.',
      photo: require('../../../assets/event1.jpg'),
      date: 'May 15, 2024',
      totalVolunteers: 50,
      location: 'Hemayetpur, Savar',
    },
    {
      id: 2,
      title: 'Community Garden Planting',
      description: 'Help us plant seeds and nurture our community garden for a greener tomorrow.',
      photo: require('../../../assets/event1.jpg'),
      date: 'June 5, 2024',
      totalVolunteers: 30,
      location: 'Agargaon, Dhaka',
    },
    // Add more events as needed
  ];

  const handleRegistration = (eventId) => {
    // Handle registration logic here
    console.log('Registered for event with ID:', eventId);
  };

  return (
    <ScrollView style={styles.container}>
        <Text className="text-[25px] mt-8 mb-5 font-bold">Upcoming Events</Text>
      {events.map(event => (
        <View key={event.id} style={styles.eventContainer}>
          <Image source={event.photo} style={styles.eventPhoto} />
          <View style={styles.eventDetails}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
            <Text style={styles.eventDate}>{event.date}</Text>
            <Text style={styles.eventLocation}>{event.location}</Text>
            <Text style={styles.totalVolunteers}>{`${event.totalVolunteers} volunteers`}</Text>
            <TouchableOpacity onPress={() => handleRegistration(event.id)} style={styles.registrationButton}>
              <Text style={styles.registrationButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  eventContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  eventPhoto: {
    width: 100,
    height: 100,
    resizeMode:'contain'
  },
  eventDetails: {
    flex: 1,
    padding: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 14,
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    marginBottom: 4,
  },
  totalVolunteers: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  registrationButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  registrationButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EventsSection;
