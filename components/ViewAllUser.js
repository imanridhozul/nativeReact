import React, { Component } from 'react';
import { StatusBar, Image, TouchableOpacity, Dimensions, Button, BackHandler, StyleSheet, Text, View } from 'react-native';
import { Container, Content, Footer, Header, Icon } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';

// select sum(biaya) as biaya,tahun from catatan group by tahun
// select sum(biaya) as biaya,bulan from catatan where tahun='2019' group by bulan
// select sum(biaya) as biaya,tanggal,bulan from catatan where tahun='2019' and bulan='May' group by tanggal //ini biaya perbulannya ada tanggal2nya
// select * from catatan where tanggal='13/may/2019' per tangggal # FF 9800
const screenHeight = Math.round(Dimensions.get('window').height);
export default class ViewAllUser extends Component {
    constructor(props) {
        super(props);
        const db = openDatabase({
            name: 'catat.db',
            location: 'default',
            createFromLocation: '~www/catat.db',
        });
        var d = new Date();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var tgl = d.getDate() + "/" + months[d.getMonth()] + "/" + d.getFullYear();
        const { navigation } = this.props;
        const bulan = navigation.getParam('bulan', months[d.getMonth()]);
        const tahun = navigation.getParam('tahun', d.getFullYear());
        const tanggal = navigation.getParam('tanggal', tgl);

        this.state = {
            db,
            pengeluaran: "",
            biaya: "",
            curentPengeluaran: [],
            edit: false,
            curentID: "",
            waktu: tgl,
            tt: 0,
            dTahun: tahun,
            dTanggal: tanggal,
            dBulan: bulan,
            colorPrimary : "#3742fa"
        };
    }
    componentDidMount() {
        this.refreshData();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    handleBackPress = () => {
        // console.warn("back");
    }

    refreshData = () => {
        // var sql = "SELECT * FROM catatan where tanggal='"+t+"'";     
        this.state.db.transaction(tx => {
            tx.executeSql("SELECT * FROM catatan where tanggal=?", [this.state.dTanggal], (tx, results) => {
                var temp = [];
                let tot = 0;
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                    let x = parseInt(results.rows.item(i).biaya);
                    tot = tot + x;
                }
                this.setState({
                    pengeluaran: "",
                    biaya: "",
                    curentPengeluaran: temp,
                    tt: tot
                });
            });
        });
    }
    addData = () => {
        var d = new Date();
        var detik = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        // var thn="2019";
        // var tgl ="17/January/2019";
        // var bln = "January"
        // console.warn(tgl,thn,bln,detik,this.state.pengeluaran,this.state.biaya);       
        this.state.db.transaction(tx => {
            tx.executeSql("insert into catatan (tanggal,tahun,bulan,jam,catatan,biaya)" +
                "values ('" + this.state.dTanggal + "','" + this.state.dTahun + "','" + this.state.dBulan + "','" + detik + "','" + this.state.pengeluaran + "','" + this.state.biaya + "')",
                [],
                (tx, results) => {
                    // console.warn("berhasil tambah data");
                    this.refreshData();
                });
        });
    }
    deleteData(id) {
        // console.warn(id);
        this.state.db.transaction(tx => {
            tx.executeSql("DELETE FROM  catatan where id=?",
                [id],
                (tx, results) => {
                    //console.warn("berhasil");
                    this.refreshData();
                });
        });
    }
    getById(id) {
        this.setState({
            edit: true,
            curentID: id
        })
        // console.warn(id);
        this.state.db.transaction(tx => {
            tx.executeSql("select * from catatan where id=?",
                [id],
                (tx, results) => {
                    this.setState({
                        biaya: results.rows.item(0).biaya,
                        pengeluaran: results.rows.item(0).catatan
                    })
                    // console.warn(results.rows.item(0).biaya);
                });
        });
    }
    editData = () => {
        this.state.db.transaction(tx => {
            tx.executeSql("UPDATE catatan set catatan=?, biaya=? where id=?",
                [this.state.pengeluaran, this.state.biaya, this.state.curentID],
                (tx, results) => {
                    this.setState({
                        biaya: "",
                        edit: false,
                        pengeluaran: ""
                    })
                    this.refreshData();
                    //console.warn("berhasil update data");
                });
        });
    }
    goString = (bilangan) => {
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
                        backgroundColor: "#1e272e", width: "100%", borderBottomWidth: 2, borderBottomColor: "#1e272e"
                    }}>

                        <View style={{
                            justifyContent: "center", alignItems: "center",
                            flexDirection: "row", marginLeft: 15,
                        }}>
                            <Icon onPress={() => this.props.navigation.openDrawer()} name="md-menu" style={{ fontSize: 35, color: "#ffa502" }} />
                            <Text style={{ marginLeft: 10, fontSize: 25, color: "#ffa502" }}>
                                {this.state.dTanggal}
                            </Text>
                        </View>
                        <Icon name="logo-freebsd-devil" style={{ marginRight: 15, fontSize: 25, color: "#ffa502" }} />

                    </View>
                    <Content>
                        {
                            this.state.curentPengeluaran.map((d, i) => {
                                return (
                                    <View key={i} style={{ flexDirection: "row", backgroundColor: "#1e272e", margin: 3, borderRadius: 10 }}>
                                        <View style={{
                                            justifyContent: "center", alignItems: "center", margin: 8, marginLeft: 7,
                                            borderRadius: 40, flex: 1
                                        }}>
                                            <Text style={{ fontSize: 50, color: "white" }}>
                                                {i + 1}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 5 }}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                <Text style={{
                                                    fontSize: 20, color: "white", marginTop: 5,
                                                    justifyContent: "center", flex: 4,
                                                }}>
                                                    {d.catatan}
                                                </Text>
                                                <View style={{
                                                    borderLeftColor: "#d2dae2", justifyContent: "space-between", alignItems: "center",
                                                    borderLeftWidth: 2, flexDirection: "row", flex: 1, marginRight: 10
                                                }}>
                                                    <TouchableOpacity
                                                        onPress={() => this.getById(d.id)}
                                                        style={{ justifyContent: "center", alignItems: "center", marginLeft: 3 }}>
                                                        <Icon name="md-create" style={{ color: "#ffa502" }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => this.deleteData(d.id)}
                                                        style={{ justifyContent: "center", alignItems: "center" }}>
                                                        <Icon name="trash" style={{ color: "#ffa502" }} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            <View style={{
                                                borderTopWidth: 5, borderTopColor: '#d2dae2', flexDirection: "row",
                                                alignItems: "center", justifyContent: "space-between"
                                            }}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <Icon name="logo-bitcoin" style={{ justifyContent: "center", color: "#d2dae2" }} />
                                                    <Text style={{
                                                        justifyContent: "center",
                                                        fontSize: 15, color: "white", marginLeft: 10
                                                    }}>
                                                        {this.goString(d.biaya)}
                                                    </Text>
                                                </View>
                                                <Text style={{
                                                    marginRight: 20, justifyContent: "center",
                                                    fontSize: 12, color: "white",
                                                    fontStyle: "italic"
                                                }}>
                                                    {d.jam}
                                                </Text>
                                            </View>
                                        </View>

                                    </View>

                                )

                            })
                        }
                        <View style={{
                            justifyContent: "center", flexDirection: "row",
                            width: "100%", alignItems: "center", height: 35
                        }}>
                            <Text style={[styles.textTot, { alignItems: "center", marginLeft: 25, marginRight: 25 }]}>
                                >>  Total : {
                                    this.goString(this.state.tt)
                                }
                            </Text>
                        </View>
                    </Content>

                    <View style={{
                        justifyContent: "center", flexDirection: "row",
                        backgroundColor: "#353b48", width: "100%"
                    }}>
                        <TextInput
                            placeholder="pengeluaran"
                            style={styles.inp}
                            value={this.state.pengeluaran}
                            onChangeText={(text) => this.setState({ pengeluaran: text })}
                        />
                        <TextInput
                            placeholder="Biaya"
                            value={this.state.biaya}
                            style={styles.inp}
                            onChangeText={(text) => this.setState({ biaya: text })}
                        />
                        {
                            this.state.edit ?
                                <TouchableOpacity
                                    style={[styles.butt, { backgroundColor: "#3742fa" }]}
                                    onPress={this.editData}
                                >
                                    <Text style={{ color: "white" }}>Edit Data</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    style={styles.butt}
                                    onPress={this.addData}
                                >
                                    <Icon name="md-shuffle" />
                                    <Text style={{ color: "black", marginLeft: 5 }}>add Data</Text>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    butt: {
        marginLeft: 3,
        color: "#2f3640",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#ffa502",
        flexDirection: "row",
        borderBottomWidth: 4, borderBottomColor: "#353b48",
        borderTopWidth: 4, borderTopColor: "#353b48",
        flex: 1, borderRadius: 10
    },

    inp: {
        marginLeft: 3,
        color: "black",
        backgroundColor: "#d2dae2",
        borderBottomWidth: 4, borderBottomColor: "#353b48",
        borderTopWidth: 4, borderTopColor: "#353b48",
        flex: 1, borderRadius: 10
    },
    textTot: {
        marginLeft: 3,
        backgroundColor: "#1e272e",
        color: "#ffa502", fontSize: 25,
        borderBottomWidth: 4, borderBottomColor: "#ffa502",
        flex: 1, borderRadius: 10
    },

});
