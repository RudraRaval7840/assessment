import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, Image, StyleSheet} from 'react-native';

const ApiCall = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const jsonData = await response.json();
    setData(jsonData);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={{uri: item.image}} style={styles.image} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.price}>Price: {item.price}</Text>
              <Text style={styles.category}>Category: {item.category}</Text>
              <Text style={styles.rating}>
                Rating: {item.rating.rate} {item.rating.count}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    borderRadius: 8,
    padding: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: '#555',
  },
});

export default ApiCall;
