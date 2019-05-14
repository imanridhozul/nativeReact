import React, { Component } from 'react';
import { Image, TouchableOpacity, Dimensions, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Container, Content, Footer, Header, Icon } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';

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
        months[d.getMonth()];
        var tgl = d.getDate() + "/" + months[d.getMonth()] + "/" + d.getFullYear();
        this.state = {
            db,
            pengeluaran: "",
            biaya: "",
            curentPengeluaran: [],
            edit: false,
            curentID: "",
            waktu: tgl,
            tt: 0
        };
    }
    componentDidMount() {
        this.refreshData();
    }
    refreshData = () => {
        var d = new Date();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        months[d.getMonth()];
        let tgl = d.getDate() + "/" + months[d.getMonth()] + "/" + d.getFullYear();
        // var sql = "SELECT * FROM catatan where tanggal='"+t+"'";     
        this.state.db.transaction(tx => {
            tx.executeSql("SELECT * FROM catatan where tanggal=?", [tgl], (tx, results) => {
                var temp = [];
                let tot = 0;
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                    let x = parseInt(results.rows.item(i).biaya);
                    tot = tot + x;
                }
                this.setState({
                    curentPengeluaran: temp,
                    tt: tot
                });
            });
        });
    }
    addData = () => {
        var d = new Date();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var tgl = d.getDate() + "/" + months[d.getMonth()] + "/" + d.getFullYear();
        var thn = d.getFullYear();
        var bln = months[d.getMonth()];
        var detik = d.getHours() + "/" + d.getMinutes() + "/" + d.getSeconds();
        // var thn="2018";
        // var tgl ="12/July/2018";
        // console.warn(tgl,thn,bln,detik,this.state.pengeluaran,this.state.biaya);       
        this.state.db.transaction(tx => {
            tx.executeSql("insert into catatan (tanggal,tahun,bulan,jam,catatan,biaya)" +
                "values ('" + tgl + "','" + thn + "','" + bln + "','" + detik + "','" + this.state.pengeluaran + "','" + this.state.biaya + "')",
                [],
                (tx, results) => {
                   // console.warn("berhasil tambah data");
                    this.refreshData();
                });
        });
    }
    deleteData(id) {
        console.warn(id);
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
        console.warn(id);
        this.state.db.transaction(tx => {
            tx.executeSql("select * from catatan where id=?",
                [id],
                (tx, results) => {
                    this.setState({
                        biaya: results.rows.item(0).biaya,
                        pengeluaran: results.rows.item(0).catatan
                    })
                    console.warn(results.rows.item(0).biaya);
                });
        });
    }
    editData=()=> {       
        this.state.db.transaction(tx => {
            tx.executeSql("UPDATE catatan set catatan=?, biaya=? where id=?",
                [this.state.pengeluaran,this.state.biaya,this.state.curentID],
                (tx, results) => {
                    this.setState({
                        biaya: "",
                        pengeluaran: ""
                    })
                    this.refreshData();
                    //console.warn("berhasil update data");
                });
        });
    }
    render() {
        return (
            <Container>
                <View style={{ backgroundColor: "#7f8fa6", flex: 1, flexDirection: 'column', justifyContent: 'space-between', }}>
                    <View style={{
                        flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                        backgroundColor: "#485460", width: "100%", borderBottomWidth: 2, borderBottomColor: "#1e272e"
                    }}>

                        <View style={{
                            justifyContent: "center", alignItems: "center",
                            flexDirection: "row", marginLeft: 15,
                        }}>
                            <Icon name="md-calendar" style={{ fontSize: 25, color: "white" }} />
                            <Text style={{ marginLeft: 10, fontSize: 25, color: "white" }}>
                                {this.state.waktu}
                            </Text>
                        </View>

                        <Icon name="logo-freebsd-devil" style={{ marginRight: 30, fontSize: 25, color: "white" }} />

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
                                                        <Icon name="md-create" style={{ color: "#f0932b" }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => this.deleteData(d.id)}
                                                        style={{ justifyContent: "center", alignItems: "center" }}>
                                                        <Icon name="trash" style={{ color: "#e55039" }} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            <View style={{
                                                borderTopWidth: 5, borderTopColor: '#d2dae2', flexDirection: "row",
                                                justifyContent: "space-between", alignItems: "center"
                                            }}>
                                                <Text style={{
                                                    justifyContent: "center",
                                                    fontSize: 15, color: "white"
                                                }}>
                                                    Harga : {d.biaya}
                                                </Text>
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
                                    this.state.tt
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
        backgroundColor: "#6ab04c",
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
        backgroundColor: "#4b6584",
        color: "white", fontSize: 25,
        borderBottomWidth: 4, borderBottomColor: "white",
        flex: 1, borderRadius: 10
    },

});
