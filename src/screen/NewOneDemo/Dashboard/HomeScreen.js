import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../../redux/Action/FavoritesAction';
import {useDispatch, useSelector} from 'react-redux';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const favorites = useSelector(state => state.favorites.favoriteBooks);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFavoriteToggle = product => {
    if (favorites.some(fav => fav.id === product.id)) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.notificationIcon}
          onPress={() => navigation.navigate('FavoritesList')}>
          <Ionicons name="notifications" size={30} color="black" />
          <Text style={styles.notificationCount}>{favorites.length}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Products</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('FireBaseStorage')}>
          <Image
            source={require('../../../assets/firebase.png')}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.productCard}>
            <Image
              source={{uri: item.image}}
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.productInfo}>
              <View>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.favButton}
                  onPress={() => handleFavoriteToggle(item)}>
                  <Image
                    source={
                      favorites.some(fav => fav.id === item.id)
                        ? require('../../../assets/UnFav.png')
                        : require('../../../assets/Fav.png')
                    }
                    style={styles.favIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginBottom: 10,
  },
  notificationIcon: {
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationCount: {
    fontSize: 16,
    color: 'black',
    marginLeft: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  productCard: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
    // flexDirection:'row',
    // borderWidth:1
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 17,
    color: 'black',
    marginBottom: 10,
  },
  favButton: {
    alignSelf: 'flex-start',
  },
  favIcon: {
    width: 30,
    height: 30,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
