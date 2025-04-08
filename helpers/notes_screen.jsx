function NotesScreen({ data, url }) {
  return (
    <View style={setStyle("container", styles, colors)}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const isSelected = selectedNotes.includes(item.id);
          return (
            <View
              style={
                isSelected
                  ? [styles.singleNote, colors.selected]
                  : [styles.singleNote, colors.notSelected]
              }
            >
              <Pressable
                onPress={
                  selecting
                    ? () => toggleSelection(item.id)
                    : () => router.push(`${url}/${item.id}/view`)
                }
                onLongPress={() => toggleSelection(item.id)}
                style={styles.box}
              >
                <View>
                  <Text style={setStyle("title", styles, colors)}>
                    {item.title}
                  </Text>
                  <Text style={setStyle("text", styles, colors)}>
                    {item.body}
                  </Text>
                </View>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    flex: 1,
    width: "100%",
    height: "100%",
  },
  singleNote: {
    margin: 4,
    padding: 8,
    fontSize: 17,
    flexBasis: 1,
    flexGrow: 1,
    flexDirection: "column",
    flex: 1,
    height: 150,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 17,
  },
  text: {},
  box: {
    width: "100%",
    height: "100%",
  },
  selected: {},
  buttonContainer: {
    position: "relative",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

const light = StyleSheet.create({
  container: {
    backgroundColor: lightColors.secondary,
  },
  singleNote: {},
  title: {
    color: lightColors.font,
  },
  text: {
    color: lightColors.font,
  },
  buttonContainer: {},
  selected: {
    backgroundColor: lightColors.detail2,
    boxShadow: "2 2 2 lightgrey",
  },
  notSelected: {
    backgroundColor: lightColors.primary,
    boxShadow: "2 2 2 lightgrey",
  },
});

const dark = StyleSheet.create({
  container: {
    backgroundColor: darkColors.secondary,
  },
  singleNote: {},
  title: {
    color: darkColors.font,
  },
  text: {
    color: darkColors.font,
  },
  buttonContainer: {},
  selected: {
    backgroundColor: darkColors.detail2,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
  },
  notSelected: {
    backgroundColor: darkColors.primary,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
  },
});
