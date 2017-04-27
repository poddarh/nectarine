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
    borderRadius: 5,
    borderColor: 'white',
    backgroundColor: '#474747',
    paddingLeft: 20,
    paddingRight: 20,
    margin: 5
  },
  text: {
    fontFamily: 'Montserrat',
    color: 'white',
    fontSize: 20
  }
});
