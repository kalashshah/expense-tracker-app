import React, { useState } from "react";
import { StyleSheet, View, Text, ListRenderItemInfo } from "react-native";
import SmoothPicker from "react-native-smooth-picker";

import { data, sizeText, opacities } from "../constants/TransactionData";

interface ItemProps {
  opacity: number;
  selected: boolean;
  fontSize: number;
  name: string;
}

const Item = React.memo(({ opacity, selected, fontSize, name }: ItemProps) => {
  return (
    <View
      style={[
        styles.OptionWrapper,
        {
          opacity,
          width: "auto",
          borderColor: selected ? "#F5C5C5" : "transparent",
        },
      ]}
    >
      <Text style={{ fontSize }}>{name}</Text>
    </View>
  );
});

const ItemToRender = (
  { item, index }: ListRenderItemInfo<any>,
  indexSelected: number
) => {
  const selected = index === indexSelected;
  const gap = Math.abs(index - indexSelected);

  let opacity = opacities[gap];
  let fontSize = sizeText[gap];
  if (gap > 3) opacity = opacities[4];
  if (gap > 1) fontSize = sizeText[2];

  return (
    <Item
      opacity={opacity}
      selected={selected}
      fontSize={fontSize}
      name={item}
    />
  );
};

interface Props {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

const Picker = ({ selected, setSelected }: Props) => {
  return (
    <View style={styles.container}>
      <SmoothPicker
        magnet
        data={data}
        scrollAnimation
        horizontal={true}
        initialScrollToIndex={selected}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onSelected={({ index }) => setSelected(index)}
        renderItem={(option) => ItemToRender(option, selected)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    color: "black",
    marginBottom: 50,
  },
  OptionWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    height: 50,
    borderWidth: 3,
    borderRadius: 10,
  },
});

export default Picker;
