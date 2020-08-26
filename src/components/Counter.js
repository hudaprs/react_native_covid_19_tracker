import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

// Components
import ChangeCountryFormModal from './ChangeCountryFormModal'

// Packages
import NumberFormat from 'react-number-format'

// React Native Component
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'

// Redux
import { connect } from 'react-redux'
import {
  FETCH_COVID_REQUESTED,
  FETCH_COUNTRY_REQUESTED
} from '../redux/actions/covidAction'

// Images
import CoronaImage from '../img/corona.png'

// Icons
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'

const Counter = ({
  covid: {
    loading,
    covids: { confirmed, recovered, deaths, lastUpdate },
    countries
  },
  fetchCovid,
  fetchCountries
}) => {
  const [refreshing, setRefreshing] = useState(false)
  const [modal, setModal] = useState(false)
  const [country, setCountry] = useState('')

  const makeToLocaleDateString = (date) => {
    return new Date(date).toLocaleDateString()
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)

    fetchCovid(country)

    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [country])

  // Fetch All
  useEffect(() => {
    fetchCovid(country)

    // eslint-disable-next-line
  }, [country])

  // Fetch Country
  useEffect(() => {
    fetchCountries()

    // eslint-disable-next-line
  }, [])

  if (loading || !confirmed || !countries) {
    return <Text>Loading...</Text>
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Image source={CoronaImage} style={styles.img} />

          {country != '' && (
            <Text style={styles.heading}>
              COVID-19 in <Text style={styles.headingBold}>{country}</Text>
            </Text>
          )}

          {/* Infected */}
          <View style={[styles.card, styles.infected]}>
            <Text style={styles.cardTitle}>Infected</Text>
            <Text style={styles.cardCounter}>
              <NumberFormat
                value={confirmed.value}
                displayType={'text'}
                thousandSeparator={true}
                prefix={''}
                renderText={(value) => <Text>{value}</Text>}
              />
            </Text>
            <Text style={styles.cardDate}>
              {makeToLocaleDateString(lastUpdate)}
            </Text>
            <Text style={styles.cardDescription}>
              Number of active cases of COVID-19
            </Text>
          </View>

          {/* Recovered */}
          <View style={[styles.card, styles.recovered]}>
            <Text style={styles.cardTitle}>Recovered</Text>
            <Text style={styles.cardCounter}>
              <NumberFormat
                value={recovered.value}
                displayType={'text'}
                thousandSeparator={true}
                prefix={''}
                renderText={(value) => <Text>{value}</Text>}
              />
            </Text>
            <Text style={styles.cardDate}>
              {makeToLocaleDateString(lastUpdate)}
            </Text>
            <Text style={styles.cardDescription}>
              Number of recovered from COVID-19
            </Text>
          </View>

          {/* Deaths */}
          <View style={[styles.card, styles.deaths]}>
            <Text style={styles.cardTitle}>Deaths</Text>
            <Text style={styles.cardCounter}>
              <NumberFormat
                value={deaths.value}
                displayType={'text'}
                thousandSeparator={true}
                prefix={''}
                renderText={(value) => <Text>{value}</Text>}
              />
            </Text>
            <Text style={styles.cardDate}>
              {makeToLocaleDateString(lastUpdate)}
            </Text>
            <Text style={styles.cardDescription}>
              Number of deaths cause of COVID-19
            </Text>
          </View>
        </ScrollView>
        {/* Floating Button */}
        <TouchableOpacity
          onPress={() => {
            setModal(!modal)
          }}
          style={styles.floatingButton}>
          <FontAwesome name='list' size={20} style={styles.floatButtonIcon} />
        </TouchableOpacity>

        {/* Modal */}
        <ChangeCountryFormModal
          modal={modal}
          setModal={setModal}
          countries={countries}
          country={country}
          setCountry={setCountry}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f4f4f4'
  },
  img: {
    width: '100%',
    marginVertical: 20,
    resizeMode: 'contain'
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20
  },
  headingBold: {
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 8,
    marginBottom: 20,
    borderBottomWidth: 20
  },
  infected: {
    borderBottomColor: '#F1C40F'
  },
  recovered: {
    borderBottomColor: '#7FFF7F'
  },
  deaths: {
    borderBottomColor: '#FF7F7F'
  },
  cardTitle: {
    color: '#757575',
    fontSize: 24,
    marginBottom: 10
  },
  cardCounter: {
    fontWeight: 'bold',
    fontSize: 16
  },
  cardDate: {
    color: '#757575',
    fontSize: 16,
    marginVertical: 10
  },
  cardDescription: {
    fontSize: 14
  },
  floatingButton: {
    position: 'absolute',
    right: 15,
    bottom: 20,
    backgroundColor: '#36D4C1',
    color: '#fff',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    textAlign: 'center',
    overflow: 'hidden',
    elevation: 10
  },
  floatButtonIcon: {
    marginTop: 15,
    height: 50,
    textAlign: 'center'
  }
})

Counter.propTypes = {
  loading: PropTypes.bool,
  covids: PropTypes.array,
  fetchCovid: PropTypes.func
}

const mapStateToProps = (state) => ({
  covid: state.covid
})

const mapDispatchToProps = (dispatch) => ({
  fetchCovid: (country) =>
    dispatch({ type: FETCH_COVID_REQUESTED, payload: country }),
  fetchCountries: () => dispatch({ type: FETCH_COUNTRY_REQUESTED })
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
