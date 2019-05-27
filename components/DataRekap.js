import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Picker, StyleSheet } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { Container, Content, Footer, Header, Icon } from 'native-base';


class DataRekap extends Component {
    constructor(props) {
        super(props);
        const db = openDatabase({
            name: 'catat.db',
            location: 'default',
            createFromLocation: '~www/catat.db',
        });
        var d = new Date();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        months[d.getMonth()];
        var tgl = d.getDate() + "/" + months[d.getMonth()] + "/" + d.getFullYear();
        this.state = {
            language: "",
            db,
            thn: "2019",
            bln: "",
            tgl: "",
            dataTahun: [],
            dataCurrentYear: [],
            waktu: tgl, tot: ""
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
                }
                this.setState({
                    dataTahun: temp,
                });
            });
        });
        this.state.db.transaction(tx => {
            tx.executeSql("select sum(biaya) as biaya,bulan from catatan where tahun=? group by bulan", [this.state.thn], (tx, results) => {
                var temp = [];
                let tot = 0;
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                    let x = parseInt(results.rows.item(i).biaya);
                    tot = tot + x;
                }
                this.setState({
                    dataCurrentYear: temp,
                    tot: tot
                });
            });
        });
    }
    pickerChange = (itemValue, itemIndex) => {
        this.setState({ thn: itemValue }, () => this.refreshData())
    }
    goString = (bilangan)=> {
        var number_string = bilangan.toString(),
            sisa = number_string.length % 3,
            rupiah = number_string.substr(0, sisa),
            ribuan = number_string.substr(sisa).match(/\d{3}/g);

        if (ribuan) {
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        // Cetak hasil
       return rupiah; // Hasil: 23.456.789
    }

    render() {
        return (
            <Container>
                <View style={{ backgroundColor: "black", flex: 1, flexDirection: 'column', justifyContent: 'space-between', }}>
                    <View style={{
                        flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                        backgroundColor: "#2d3436", width: "100%", height: 50
                    }}>
                        <View style={{
                            justifyContent: "center", alignItems: "center",
                            flexDirection: "row", marginLeft: 15,
                        }}>
                            <Icon onPress={() => this.props.navigation.openDrawer()} name="md-menu" style={{ fontSize: 35, color: "#FFFF00" }} />
                            <Text style={{ marginLeft: 10, fontSize: 25, color: "#FFFF00" }}>
                                {this.state.waktu}
                            </Text>
                        </View>
                        <Icon name="logo-freebsd-devil" style={{ marginRight: 15, fontSize: 25, color: "#FFFF00" }} />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{
                            color: "white", marginLeft: 4, marginRight: 10,
                            flexDirection: "row"
                        }}>
                            Selected Year
                        </Text>
                        <View style={{ backgroundColor: "#2d3436", color: "white", flexDirection: "row", alignItems: "center" }}>
                            <Icon name="md-arrow-dropdown-circle" style={{ fontSize: 15, marginLeft: 10, backgroundColor: "#2d3436", color: "white" }} />
                            <Picker
                                selectedValue={this.state.thn}
                                style={{ height: 30, width: "80%", backgroundColor: "#2d3436", color: "white" }}
                                onValueChange={(itemValue, itemIndex) => this.pickerChange(itemValue, itemIndex)}>
                                <Picker.Item label="Year" value="" />
                                {
                                    this.state.dataTahun.map(t => {
                                        return (
                                            <Picker.Item key={t.id} label={t.tahun} value={t.tahun} />
                                        )
                                    })
                                }
                            </Picker>
                        </View>
                    </View>
                    <Content>
                        <View style={styles.grid}>
                            {
                                this.state.dataCurrentYear.map(d => {
                                    return (
                                        <View key={d.bulan} style={styles.col}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.props.navigation.navigate('Bulan', {
                                                        bulan: d.bulan,
                                                        tahun: this.state.thn,
                                                    });
                                                }}
                                                style={{
                                                    width: "100%",
                                                    marginLeft: 15, marginRight: 15, marginTop: 3,
                                                }}>
                                                <View style={{
                                                    flexDirection: "row", backgroundColor: "#2d3436", borderTopLeftRadius: 7,
                                                    borderTopRightRadius: 7, alignItems: "center"
                                                }}>
                                                    <Icon name="md-calendar" style={{ marginLeft: 15, fontSize: 20, color: "white" }} />
                                                    <Text style={{
                                                        color: "white", marginLeft: 10, fontSize: 25,
                                                        justifyContent: "center", alignItems: "center"
                                                    }}>{d.bulan}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: "row", backgroundColor: "#f5f6fa", borderBottomLeftRadius: 7,
                                                    borderBottomRightRadius: 7, alignItems: "center"
                                                }}>
                                                    <Icon name="md-calculator" style={{ marginLeft: 15, fontSize: 20, color: "#353b48" }} />
                                                    <Text style={{
                                                        color: "#353b48", marginLeft: 10, fontSize: 25,
                                                        justifyContent: "center", alignItems: "center"
                                                    }}>{this.goString(d.biaya)}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </Content>
                    
                    <View style={{
                        justifyContent: "center", flexDirection: "row",
                        backgroundColor: "#2d3436", width: "100%"
                    }}>
                        <Text style={{ color: "#FFFF00" }}>
                            Total : {this.goString(this.state.tot)}
                        </Text>
                    </View>
                </View>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    grid: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        justifyContent: 'space-between',
    },
    col: {
        flexBasis: "45%",
        borderWidth: 1,
        alignItems: 'center',
        borderColor: 'black',
        margin: 5,
    },
});
export default DataRekap;
