import { CommonActions } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";

import EditTransaction from "../components/EditTransaction";
import RoundedIcon from "../components/RoundedIcon";
import axiosInstance from "../services/axiosInstance";
import { DrawerNavigationProps, DrawerRoutes } from "../constants/DrawerRoutes";

const TIME = 400;

const TransactionItem = ({
  navigation,
  route,
}: DrawerNavigationProps<DrawerRoutes, "TransactionItem">) => {
  const [isModal, setModal] = useState(false);

  const dataRef = useRef(null) as React.RefObject<Animatable.View & View>;
  const bounceLeft = useRef(null) as React.RefObject<Animatable.View & View>;
  const bounceMid = useRef(null) as React.RefObject<Animatable.View & View>;
  const bounceRight = useRef(null) as React.RefObject<Animatable.View & View>;

  const { item } = route.params;

  useEffect(() => {
    return () => {
      if (dataRef.current?.fadeInUp) dataRef.current.fadeInUp(TIME);
      if (bounceLeft.current?.bounceIn) bounceLeft.current.bounceIn(TIME * 3);
      if (bounceMid.current?.bounceIn) bounceMid.current.bounceIn(TIME * 4);
      if (bounceRight.current?.bounceIn) bounceRight.current.bounceIn(TIME * 5);
    };
  }, [item]);

  const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleDelete = () => {
    axiosInstance.delete(`/transaction/${item._id}`).then(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Transaction" }],
        })
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.kav}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.top}>
            <Text style={styles.name}>{item.name.toUpperCase()}</Text>
          </View>
          <View style={styles.bottom}>
            <Animatable.View animation="fadeInUp" ref={dataRef}>
              <View style={styles.field}>
                <Text style={styles.title}>Description</Text>
                <Text style={styles.sub}>{item.description}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>Date</Text>
                <Text style={styles.sub}>
                  {new Date(item.date).toDateString()}
                </Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>Type</Text>
                <Text style={styles.sub}>{capitalize(item.type)}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>Amount</Text>
                <Text style={styles.sub}>₹{item.amount}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>Category</Text>
                <View style={styles.category}>
                  <RoundedIcon
                    size={42}
                    color="white"
                    name={item.category.icon}
                    backgroundColor={item.category.color}
                  />
                  <Text style={styles.categoryText}>{item.category.name}</Text>
                </View>
              </View>
            </Animatable.View>
            <View style={styles.buttonContainer}>
              <Animatable.View
                animation="bounceIn"
                delay={TIME + 100}
                ref={bounceLeft}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Transaction");
                    setModal(false);
                  }}
                >
                  <RoundedIcon
                    name="corner-down-left"
                    backgroundColor="#a8e6cf"
                    color="black"
                    size={50}
                  />
                </TouchableOpacity>
              </Animatable.View>
              <Animatable.View
                animation="bounceIn"
                delay={TIME + 200}
                ref={bounceMid}
              >
                <TouchableOpacity onPress={() => setModal((isOpen) => !isOpen)}>
                  <RoundedIcon
                    name="edit"
                    backgroundColor="#ff8b94"
                    color="black"
                    size={50}
                  />
                </TouchableOpacity>
              </Animatable.View>
              <Animatable.View
                animation="bounceIn"
                delay={TIME + 300}
                ref={bounceRight}
              >
                <TouchableOpacity onPress={handleDelete}>
                  <RoundedIcon
                    name="trash-2"
                    backgroundColor="#ffeead"
                    color="black"
                    size={50}
                  />
                </TouchableOpacity>
              </Animatable.View>
            </View>
          </View>
          <EditTransaction
            visible={isModal}
            item={item}
            navigation={navigation}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 0.12,
    justifyContent: "center",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginLeft: 25,
  },
  bottom: {
    flex: 1,
    flexGrow: 1,
    margin: 30,
    justifyContent: "space-between",
  },
  field: {
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  sub: {
    fontSize: 16,
    color: "#000",
    opacity: 0.7,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 18,
    color: "black",
    marginLeft: 10,
  },
  kav: {
    flex: 1,
  },
});
