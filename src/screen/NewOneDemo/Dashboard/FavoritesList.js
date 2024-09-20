import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {removeFromFavorites} from '../../../redux/Action/FavoritesAction';

const FavoritesList = () => {
  const favorites = useSelector(state => state.favorites.favoriteBooks);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRemove = productId => {
    dispatch(removeFromFavorites(productId));
  };

  const renderFavoriteItem = ({item}) => (
    <View style={styles.productCard}>
      <Image
        source={{uri: item.image}}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemove(item.id)}>
          <Ionicons name="trash-bin" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Favorites</Text>
      </View>
      <View style={{marginHorizontal: 10}}>
        {favorites.length === 0 ? (
          <Text style={styles.emptyText}>No favorites yet</Text>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={item => item.id.toString()}
            renderItem={renderFavoriteItem}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 10,
    // paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  backButton: {
    left: 10,
  },
  headerText: {
    fontSize: 25,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  removeButton: {
    alignSelf: 'flex-start',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});

export default FavoritesList;
