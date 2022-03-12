import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { LineChart, BarChart, ProgressChart } from "react-native-chart-kit";
import * as Animatable from "react-native-animatable";

import Loading from "../components/Loading";
import axiosInstance from "../services/axiosInstance";
import {
  bezierExpConfig,
  bezierIncConfig,
  progressConfig,
  barExpConfig,
  barIncConfig,
  labels,
} from "../constants/ChartConfig";
import { Data, Total } from "../types/Dashboard";

const WIDTH = Dimensions.get("window").width - 25;
const HEIGHT = 300;
const DURATION = 400;

const Dashboard = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState<number[]>([]);
  const [monthlyIncome, setMonthlyIncome] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<Total>({ income: 0, expense: 0 });
  const sum = total.expense + total.income;

  useEffect(() => {
    axiosInstance
      .get("/dashboard")
      .then((res) => {
        const { total, monthlyExpTotal, monthlyIncTotal }: Data = res.data;
        setMonthlyExpenses(monthlyExpTotal);
        setMonthlyIncome(monthlyIncTotal);
        setTotal(total);

        setIsLoading(false);
      })
      .catch(() => {});
  }, []);

  if (isLoading) return <Loading />;

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Animatable.View style={styles.top} animation="fadeInUp" delay={DURATION}>
        <View style={styles.topView}>
          <Text style={styles.title}>Total Income:</Text>
          <Text style={[styles.sub, styles.inc]}>₹{total.income}</Text>
        </View>
        <View style={styles.topView}>
          <Text style={styles.title}>Total Expenses:</Text>
          <Text style={[styles.sub, styles.exp]}>₹{total.expense}</Text>
        </View>
      </Animatable.View>
      <Animatable.View
        style={styles.view}
        animation="fadeInUp"
        delay={DURATION * 2}
      >
        <Text style={styles.title}>Income throughout the year</Text>
        <LineChart
          data={{
            labels,
            datasets: [{ data: monthlyIncome }],
          }}
          width={WIDTH}
          height={HEIGHT}
          yAxisLabel="₹"
          yAxisInterval={1}
          chartConfig={bezierExpConfig}
          bezier
          style={styles.chart}
        />
      </Animatable.View>
      <Animatable.View
        style={styles.view}
        animation="fadeInUp"
        delay={DURATION * 3}
      >
        <Text style={styles.title}>Expenses throughout the year</Text>
        <LineChart
          data={{
            labels,
            datasets: [{ data: monthlyExpenses }],
          }}
          width={WIDTH}
          height={HEIGHT}
          yAxisLabel="₹"
          yAxisInterval={1}
          chartConfig={bezierIncConfig}
          bezier
          style={styles.chart}
        />
      </Animatable.View>
      <Animatable.View
        style={styles.view}
        animation="fadeInUp"
        delay={DURATION * 4}
      >
        <Text style={styles.title}>Income vs Expenses</Text>
        <ProgressChart
          data={{
            labels: ["Income", "Expense"],
            data: [total.income / sum, total.expense / sum],
          }}
          width={WIDTH}
          height={HEIGHT}
          chartConfig={progressConfig}
          backgroundColor="transparent"
          accessor="data"
          paddingLeft="15"
          style={styles.chart}
        />
      </Animatable.View>
      <Animatable.View
        style={styles.view}
        animation="fadeInUp"
        delay={DURATION * 5}
      >
        <Text style={styles.title}>Income BarChart</Text>
        <BarChart
          data={{
            labels,
            datasets: [{ data: monthlyIncome }],
          }}
          width={WIDTH}
          height={HEIGHT}
          yAxisLabel={"₹"}
          chartConfig={barIncConfig}
          yAxisSuffix={""}
          style={styles.chart}
        />
      </Animatable.View>
      <Animatable.View
        style={styles.view}
        animation="fadeInUp"
        delay={DURATION * 6}
      >
        <Text style={styles.title}>Expenses BarChart</Text>
        <BarChart
          data={{
            labels,
            datasets: [{ data: monthlyExpenses }],
          }}
          width={WIDTH}
          height={HEIGHT}
          yAxisLabel={"₹"}
          chartConfig={barExpConfig}
          yAxisSuffix={""}
          style={styles.chart}
        />
      </Animatable.View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  chart: {
    borderRadius: 16,
  },
  scroll: {
    alignItems: "center",
  },
  view: {
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  sub: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inc: {
    color: "#2E8B57",
  },
  exp: {
    color: "#DC143C",
  },
  top: {
    flexDirection: "row",
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: "2%",
  },
});
