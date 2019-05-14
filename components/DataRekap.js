import React, { Component } from 'react';
import { Button,View, Text, Picker } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

class DataRekap extends Component {
    constructor(props) {
        super(props);
        const db = openDatabase({
            name: 'catat.db',
            location: 'default',
            createFromLocation: '~www/catat.db',
        });
        this.state = {
            language: "",
            db,
            thn: "",
            bln: "",
            tgl: "",
            dataTahun: []
        };
    }
    componentDidMount() {
        this.refreshData();
    }
    refreshData = () => {
        this.state.db.transaction(tx => {
            tx.executeSql("SELECT * FROM catatan group by tahun", [], (tx, results) => {
                var temp = [];
                let tot = 0;
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                    let x = parseInt(results.rows.item(i).biaya);
                    tot = tot + x;
                }
                this.setState({
                    dataTahun: temp,
                });
            });
        });
    }

    render() {
        return (
            <View>
                <Picker
                    selectedValue={this.state.language}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ language: itemValue })
                    }>

                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />

                </Picker>

                <Button
                    title="Go to Details"
                    onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        this.props.navigation.navigate('Bul', {
                            itemId: 86,
                            otherParam: 'Siap 86',
                        });
                    }}
                />
                <Text> {this.state.language} </Text>
                {
                    this.state.dataTahun.map(t => {
                        return (
                            <View>
                                <Text>{t.tahun}</Text>

                            </View>

                        )
                    })
                }
            </View>
        );
    }
}

export default DataRekap;
