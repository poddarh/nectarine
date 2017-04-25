import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  body: {
    backgroundColor: '#236e68',
    paddingTop: 50,
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 25,
    fontWeight: '300',
    color: 'white',
  },
  img: {
      marginTop: 50,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 30,
      borderColor: 'white',
      borderRadius: 10,
      borderWidth: 2,
      backgroundColor: '#474747',
      padding: 10,
  },
  search: {
      width: 400,
      margin: 'auto',
      marginTop: 25,
      marginBottom: 25,
  },
  container: {
    flex: 1,
  },
  preview: {
   flex: 1,
   justifyContent: 'flex-end',
   alignItems: 'center'
  },
  share: {
    flex: 1,
    borderRadius: 3,
    borderColor: 'white',
    backgroundColor: '#474747',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 5,
    alignSelf: 'stretch'
  },
  file: {
    flex: 1,
    borderRadius: 3,
    borderColor: 'white',
    backgroundColor: '#474747',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 5,
    alignSelf: 'stretch'
  },
  folder: {
    flex: 1,
    borderRadius: 3,
    borderColor: 'white',
    backgroundColor: '#779500',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 5,
    alignSelf: 'stretch'
  },
  text: {
    fontFamily: 'Montserrat',
    color: 'white',
    fontSize: 20
  }
});
