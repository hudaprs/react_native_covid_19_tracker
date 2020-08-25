import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

// Packages
import NumberFormat from 'react-number-format'

// React Native Component
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet
} from 'react-native'

// Redux
import { connect } from 'react-redux'
import { FETCH_COVID_REQUESTED } from '../redux/actions/covidAction'

const Counter = ({
  covid: {
    loading,
    covids: { confirmed, recovered, deaths, lastUpdate }
  },
  fetchCovid
}) => {
  const [refreshing, setRefreshing] = useState(false)

  const makeToLocaleDateString = (date) => {
    return new Date(date).toLocaleDateString()
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)

    fetchCovid()

    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  useEffect(() => {
    fetchCovid()

    // eslint-disable-next-line
  }, [])

  if (loading || !confirmed) {
    return <Text>Loading...</Text>
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#f4f4f4'
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: '32%',
    borderRadius: 5,
    elevation: 5,
    marginBottom: 10,
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
    fontSize: 16
  },
  cardDescription: {
    fontSize: 14
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
  fetchCovid: () => dispatch({ type: FETCH_COVID_REQUESTED })
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
