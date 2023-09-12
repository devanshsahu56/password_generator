import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';

const PasswordSchema = Yup.object().shape({
  passwordLenght: Yup.number()
    .min(4, 'should be min of 4 characters')
    .max(16, 'should be max of 4 characters')
    .required('Length is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowercase, setLowercase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatedPasswordString = (passwordLenght: number) => {
    let characterList = '';
    const upperCaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseList = 'abcdefghijklmnopqrstuvwxyz';
    const digitsChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseList;
    }
    if (lowercase) {
      characterList += lowerCaseList;
    }
    if (number) {
      characterList += digitsChars;
    }
    if (symbols) {
      characterList += specialChars;
    }

    const passwordResults = createPassword(characterList, passwordLenght);
    setPassword(passwordResults);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characthers: string, passwordLenght: number) => {
    let rseults = '';
    for (let i = 0; i < passwordLenght; i++) {
      const characterIndex = Math.round(Math.random() * characthers.length);
      rseults += characthers.charAt(characterIndex);
    }
    return rseults;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowercase(true);
    setUpperCase(false);
    setNumber(false);
    setSymbols(false);
  };

  return (
    <ScrollView style={styles.main} keyboardShouldPersistTaps="always">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passwordLenght: ''}}
            validationSchema={PasswordSchema}
            onSubmit={value => {
              generatedPasswordString(+value.passwordLenght); //todo;
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLenght && errors.passwordLenght &&(
                      <Text style={styles.errorText}>{errors.passwordLenght}</Text>
                    )}
                    
                  </View>
                  <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLenght}
                      onChangeText={handleChange('passwordLenght')}
                      placeholder="Eg. 8(max-16)"
                      keyboardType="numeric"
                      placeholderTextColor = '#fff'
                    />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Lowercase Letters</Text>
                  <BouncyCheckbox 
                    disableBuiltInState
                    isChecked={lowercase}
                    onPress={()=> setLowercase(!lowercase)}
                    fillColor='#29AB87'
                  />
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include Uppercase Letters</Text>
                  <BouncyCheckbox 
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={()=> setUpperCase(!upperCase)}
                    fillColor='#FED85D'
                  />
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox 
                    disableBuiltInState
                    isChecked={number}
                    onPress={()=> setNumber(!number)}
                    fillColor='#C9A0DC'
                  />
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox 
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={()=> setSymbols(!symbols)}
                    fillColor='#FC80A5'
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity 
                  disabled={!isValid}
                  style={styles.primaryBtn}
                  onPress={handleSubmit}
                  >
                    <Text style={styles.primaryBtnTxt} >Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  style={styles.secondaryBtn}
                  onPress={()=>{
                    handleReset();
                    resetPasswordState()
                  }}
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPasswordGenerated? (
          <View style={[styles.card ,styles.cardElevated ]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>The new password is:</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main:{
    height: '100%',
    width: '100%',
    backgroundColor:'#fff'
  },
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
    textAlign:'center',
    color:'#f78536'
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
    color:'#402a23'
  },
  description: {
    color: '#a28f70',
    marginBottom: 8,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color:"#dfebed",
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor:'#497285',
    height: 50,
    width: '100%',
    borderRadius: 7,
    paddingHorizontal: 12 ,
    paddingVertical: 8,

  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#fff',
    color:'#fff',
    fontSize: 14
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#7dd87d',
  },
  primaryBtnTxt: {
    fontSize: 14,
    color: '#118a7e',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#efac2a',
    alignItems: 'center',
    justifyContent: 'center',

  },
  secondaryBtnTxt: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color:'#393e46'
  },
  card: {
    backgroundColor: '#f4e5c2',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 6,
    marginHorizontal: 12,
    borderWidth: 1.5,
    borderColor: '#7e6752',
  },
  cardElevated: {
    elevation: 1,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowColor: '#fff',
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  generatedPassword: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 12,
    color: '#222831',
  },
});
