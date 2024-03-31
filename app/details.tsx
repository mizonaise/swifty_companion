import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import {
  FlatList,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import ProgressBar from "@/components/ProgreeBar";
import { Button, Text, View } from "@/components/Themed";

type ItemProps = { title: string; level: string; status: boolean };

const Item = ({ title, level, status }: ItemProps) => {
  console.log(status);
  return (
    <View>
      <View style={[styles.row, styles.item]}>
        <Text style={styles.title}>{title}</Text>
        <View
          style={{
            padding: 4,
            paddingHorizontal: 10,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: status ? "#02cdd1" : "#ff4545",
          }}
        >
          <Text style={{}}>{level}</Text>
        </View>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
};

export default function DetailsScreen() {
  const params = useLocalSearchParams();
  const {
    link,
    phone,
    email,
    login,
    campus,
    wallet,
    username,
    cursus,
    userProjects,
    correctionPoint,
  } = params;
  const userCursus = JSON.parse(cursus as string);
  const projects = JSON.parse(userProjects as string);

  console.log(projects);

  const [selected, setSelected] = useState("projects");
  const [selectedCursus, setSelectedCursus] = useState(userCursus[0].cursus.id);
  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <View style={styles.imageContainer}>
          <ImageBackground
            resizeMode="cover"
            style={styles.image}
            source={{ uri: `${link}` }}
          />
        </View>
      </View>

      <View
        style={{
          paddingVertical: 16,
          paddingHorizontal: 22,
        }}
      >
        <View
          style={[
            {
              paddingVertical: 10,
            },
            styles.row,
          ]}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            {username}
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              paddingTop: 4,
              paddingLeft: 5,
            }}
          >
            {`(${login})`}
          </Text>
        </View>

        <View
          style={{
            padding: 10,
            borderRadius: 8,
            marginVertical: 10,
          }}
          lightColor="rgba(0,0,0,0.1)"
          darkColor="rgba(255,255,255,0.4)"
        >
          <View
            darkColor="transparent"
            lightColor="transparent"
            style={styles.row}
          >
            <Text
              darkColor="white"
              lightColor="black"
              style={{
                fontSize: 14,
                fontWeight: "700",
                padding: 4,
                color: "#02cdd1",
              }}
            >
              Wallet:
            </Text>
            <Text
              darkColor="white"
              lightColor="black"
              style={{
                fontSize: 14,
                fontWeight: "700",
                padding: 4,
              }}
            >
              {wallet}
            </Text>
          </View>

          <View
            darkColor="transparent"
            lightColor="transparent"
            style={styles.row}
          >
            <Text
              darkColor="white"
              lightColor="black"
              style={{
                fontSize: 14,
                fontWeight: "700",
                padding: 4,
                color: "#02cdd1",
              }}
            >
              Correction Point:
            </Text>
            <Text
              darkColor="white"
              lightColor="black"
              style={{
                fontSize: 14,
                fontWeight: "700",
                padding: 4,
              }}
            >
              {correctionPoint}
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingVertical: 10,
          }}
        >
          {phone && phone !== "hidden" ? (
            <View style={[{ paddingVertical: 2 }, styles.row]}>
              <MaterialIcons name="phone" size={18} color="#02cdd1" />
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 6,
                  fontWeight: "500",
                }}
              >
                {phone}
              </Text>
            </View>
          ) : null}

          <View style={[{ paddingVertical: 2 }, styles.row]}>
            <Ionicons name="location" size={18} color="#02cdd1" />
            <Text
              style={{
                fontSize: 14,
                paddingLeft: 6,
                fontWeight: "500",
              }}
            >
              {campus}
            </Text>
          </View>

          <View style={[{ paddingVertical: 2 }, styles.row]}>
            <MaterialIcons name="email" size={18} color="#02cdd1" />
            <Text
              style={{
                fontSize: 14,
                paddingLeft: 6,
                fontWeight: "500",
              }}
            >
              {email}
            </Text>
          </View>
        </View>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        <View
          style={{
            borderRadius: 8,
            marginVertical: 10,
          }}
          lightColor="rgba(0,0,0,0.1)"
          darkColor="rgba(255,255,255,0.4)"
        >
          <Picker
            selectedValue={selectedCursus}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCursus(itemValue)
            }
          >
            {userCursus.map((item: any) => {
              return (
                <Picker.Item
                  key={item.id}
                  value={item.cursus.id}
                  label={item.cursus.name}
                />
              );
            })}
          </Picker>
        </View>

        <View
          style={{
            marginBottom: 10,
            paddingVertical: 10,
          }}
        >
          <ProgressBar
            progress={
              (userCursus.filter(
                (item: any) => item.cursus.id === selectedCursus
              )[0].level || 0) as string
            }
          />
        </View>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        <View
          darkColor="transparent"
          lightColor="transparent"
          style={styles.row}
        >
          <Button
            style={{
              padding: 8,
              paddingHorizontal: 20,
              marginTop: 10,
              borderRadius: 30,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#02cdd1",
              backgroundColor:
                selected === "projects" ? "#02cdd1" : "rgba(255,255,255,0.5)",
            }}
            onPress={() => setSelected("projects")}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: selected === "projects" ? "white" : "#02cdd1",
              }}
              darkColor="black"
              lightColor="white"
            >
              Projects
            </Text>
          </Button>
          <Button
            style={{
              padding: 8,
              marginHorizontal: 12,
              paddingHorizontal: 20,
              marginTop: 10,
              borderRadius: 30,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#02cdd1",
              backgroundColor:
                selected === "skills" ? "#02cdd1" : "rgba(255,255,255,0.5)",
            }}
            onPress={() => setSelected("skills")}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: selected === "skills" ? "white" : "#02cdd1",
              }}
              darkColor="black"
              lightColor="white"
            >
              Skills
            </Text>
          </Button>
        </View>
        <View>
          {selected === "projects"
            ? projects
                .filter((item: any) => item.cursus_ids[0] === selectedCursus)
                .map((e: any) => {
                  return (
                    <Item
                      key={e.id}
                      status={
                        e.status === "in_progress" ||
                        e["validated?"] === null ||
                        (e.status === "finished" && e["validated?"])
                      }
                      title={e.project?.name}
                      level={
                        e.status === "in_progress"
                          ? "In Progress"
                          : e.final_mark ?? 0
                      }
                    />
                  );
                })
            : userCursus
                .filter((item: any) => item.cursus.id === selectedCursus)[0]
                .skills.map((e: any) => (
                  <Item
                    key={e.id}
                    title={e.name}
                    level={e.level}
                    status={true}
                  />
                ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 300,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  row: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  separator: {
    height: 1,
    width: "100%",
    marginVertical: 1,
  },
  item: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    justifyContent: "space-between",
  },
  title: {
    width: "70%",
    fontSize: 14,
  },
});
