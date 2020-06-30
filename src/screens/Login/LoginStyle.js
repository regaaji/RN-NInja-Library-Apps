
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
        flex: 1,
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "flex-end",
    },

    input1: {
    marginTop: 40,
    borderWidth: 1,
    borderColor: '#4B4C72',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 14,
    color: "black", 
  },

   input2: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#4B4C72',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 14,
    color: "black", 
  },
    btnContainer: {
        backgroundColor: "transparent",
        marginTop: 70,
    },
})


export default styles;