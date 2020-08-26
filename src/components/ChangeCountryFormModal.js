import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

// React Native
import {
  View,
  Text,
  Modal,
  Picker,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native'

// Icons
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'

const deviceHeight = Dimensions.get('screen').height

const ChangeCountryFormModal = ({
  modal,
  setModal,
  countries,
  country,
  setCountry
}) => {
  const modalContainerRef = useRef()

  const onSetModal = () => {
    setModal(false)
  }

  return (
    <Modal animationType="fade" transparent={true} visible={modal}>
      <TouchableOpacity
        ref={modalContainerRef}
        style={styles.modalContainer}
        onPress={(e) => {
          if (e.target === modalContainerRef.current) {
            onSetModal()
          }
        }}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderTitle}>Pick Country</Text>
          <TouchableOpacity onPress={onSetModal}>
            <FontAwesome name="times" color="black" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.modalBody}>
          <TouchableOpacity style={styles.picker}>
            <Picker
              selectedValue={country}
              onValueChange={(itemValue, itemIndex) => {
                setCountry(itemValue)
                setModal(false)
              }}>
              <Picker.Item label="Global" value={''} />
              {countries.map(({ name }, index) => (
                <Picker.Item label={name} value={name} key={index} />
              ))}
            </Picker>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

ChangeCountryFormModal.propTypes = {
  loading: PropTypes.bool,
  countries: PropTypes.array,
  fetchCountries: PropTypes.func
}

const styles = StyleSheet.create({
  modalContainer: {
    height: deviceHeight,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, .2)'
  },
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#36D4C1',
    height: 60,
    paddingHorizontal: 20,
    elevation: 10
  },
  modalHeaderTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  modalBody: {
    backgroundColor: '#fff',
    height: '23%',
    paddingHorizontal: 20
  },
  picker: {
    marginTop: 5,
    height: 50,
    width: '100%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
})

export default ChangeCountryFormModal
