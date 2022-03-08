import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

import {
  StackNavigationProps,
  AuthenticationRoutes,
} from "../constants/AuthenticationRoutes";
import Animation from "../components/Animation";

const pages = [
  {
    backgroundColor: "#a6e4d0",
    title: "Welcome to Expense App",
    subtitle: "Track your expenses and save money",
    image: <Animation source={require("../assets/animations/ob1.json")} />,
  },
  {
    backgroundColor: "#e0f1bb",
    title: "Keep growing your capital",
    subtitle:
      "Develop healthy spending habits and improve your financial health",
    image: <Animation source={require("../assets/animations/ob2.json")} />,
  },
  {
    backgroundColor: "#aef1ff",
    title: "Learn to Manage your money",
    subtitle:
      "Keep track of your earnings, expenses and spend your money wisely",
    image: <Animation source={require("../assets/animations/ob3.json")} />,
  },
  {
    backgroundColor: "#ccb3ff",
    title: "Add your expenses",
    subtitle:
      "Add your expenses and income and see how much you have spent and earned",
    image: <Animation source={require("../assets/animations/ob4.json")} />,
  },
  {
    backgroundColor: "#fff0b3",
    title: "Track your credit",
    subtitle:
      "Keep track of individual credit cards and their payments. Always have an amazing credit score!",
    image: <Animation source={require("../assets/animations/ob5.json")} />,
  },
];

const Onboard = ({
  navigation,
}: StackNavigationProps<AuthenticationRoutes, "Onboard">) => {
  const onDone = () => navigation.navigate("Login");
  const onSkip = () => navigation.replace("Login");

  const DoneButtonComponent = ({ ...props }) => (
    <TouchableOpacity style={styles.doneButton} {...props}>
      <Text style={styles.doneText}>Done</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      transitionAnimationDuration={250}
      bottomBarHighlight={false}
      {...{ pages, onDone, onSkip, DoneButtonComponent }}
    />
  );
};

export default Onboard;

const styles = StyleSheet.create({
  doneButton: { marginRight: 20 },
  doneText: { fontSize: 16 },
});
