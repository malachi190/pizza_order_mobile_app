import Button from "@/src/components/content/Button";
import Colors from "@/src/constants/Colors";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { id } = useLocalSearchParams();

  const isUpdating = !!id;

  const resetFiled = () => {
    setName("");
    setPrice("");
  };

  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name must be provided");
      return false;
    }

    if (!price) {
      setErrors("Price must be provided");
      return false;
    }

    if (isNaN(parseFloat(price))) {
      setErrors("Price must be a number");
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onUpdate = () => {
    if (!validateInput()) {
      return;
    }

    //Save product in database
    resetFiled();
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    //Save product in database
    resetFiled();
  };

  const defaultImage =
    "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGl6emF8ZW58MHx8MHx8fDA%3D";

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onDelete = () => {
    console.warn("Are you sure you want to delete?");
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  return (
    <View style={style.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />
      <Image source={{ uri: image || defaultImage }} style={style.image} />
      <Text style={style.select} onPress={pickImage}>
        Select Image
      </Text>
      <Text style={style.label}>Name</Text>
      <TextInput
        placeholder='enter name'
        style={style.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={style.label}>Price ($)</Text>
      <TextInput
        placeholder='$9.99'
        style={style.input}
        keyboardType='numeric'
        value={price}
        onChangeText={setPrice}
      />
      <Text style={{ color: "red" }}>{errors}</Text>
      <Button text='Submit' onPress={onSubmit} />
      {isUpdating && (
        <Text style={style.select} onPress={confirmDelete}>
          Delete
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    marginTop: 5,
    borderRadius: 5,
    marginBottom: 20,
    // borderBlockColor: "#333",
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: 100,
  },
  select: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default CreateProductScreen;
