import React, { Component } from 'react';
import { Alert, Button,TextInput, View, StyleSheet } from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'Todo.db'});

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='task'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS task(id INTEGER PRIMARY KEY AUTOINCREMENT, description VARCHAR(20), status BOOLEAN)',
              []
            );
          }
        }
      );
    });
  }
    render(){
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40,width:250, borderColor: 'gray', borderWidth: 1 }}
        />
        <Button
          title="Add"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
      </View>
    );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
