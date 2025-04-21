import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
// import { Link, useRouter } from "expo-router";
// import {
// View,
// Text,
// FlatList,
// StyleSheet,
// Pressable,
// useWindowDimensions,
// LogBox,
// } from "react-native";
import { NotesContext } from "../../helpers/notes_provider";
// import { useNavigation } from "@react-navigation/native";
// import RightMenuMulti from "../../helpers/right_menu_multi";
// import LeftMenuMulti from "../../helpers/left_menu_multi";
// import RenderHtml from "react-native-render-html";
import NotesScreen from "../../helpers/notes_screen";

export default function AllNotes() {
  const { notes, setNotes, openNotes, setOpenNotes } = useContext(NotesContext);
  // const [selecting, setSelecting] = useState(false);
  // const [selectedNotes, setSelectedNotes] = useState([]);
  // const router = useRouter();
  // const navigation = useNavigation();

  useEffect(() => {
    const open = notes.filter((note) => note.status == "open");
    setOpenNotes(open);
  }, [notes]);

  // useLayoutEffect(() => {
  //   const parent = navigation.getParent();
  //   parent.setOptions({
  //     headerRight: () => (
  //       <RightMenuMulti
  //         screen={"openIndex"}
  //         selecting={selecting}
  //         startSelecting={startSelecting}
  //         stopSelecting={stopSelecting}
  //         selectedNotes={selectedNotes}
  //       />
  //     ),
  //   });

  //   if (selecting) {
  //     parent.setOptions({
  //       title: "",
  //       headerLeft: () => (
  //         <LeftMenuMulti
  //           screen={"openIndex"}
  //           selecting={selecting}
  //           startSelecting={startSelecting}
  //           stopSelecting={stopSelecting}
  //           selectedNotes={selectedNotes}
  //         />
  //       ),
  //     });
  //   } else {
  //     parent.setOptions({
  //       title: "All notes",
  //       headerLeft: null,
  //     });
  //   }
  // }, [navigation, selecting, selectedNotes]);

  // function startSelecting() {
  //   // console.log(selecting);
  //   setSelecting(true);
  //   // show slide in menu
  // }

  // function stopSelecting() {
  //   setSelecting(false);
  //   setSelectedNotes([]);
  //   // hide slide in menu
  // }

  // function toggleSelection(id) {
  //   // add or remove note from selection

  //   if (selectedNotes.includes(id)) {
  //     // remove selection
  //     const newList = selectedNotes.filter((note_id) => note_id != id);
  //     if (new Promise((resolve, reject) => {})) setSelectedNotes(newList);
  //     if (newList.length == 0) {
  //       setSelecting(false);
  //     }
  //     console.log("selection", newList);
  //   } else {
  //     // add note to selection
  //     const newList = [...selectedNotes, id];
  //     setSelectedNotes(newList);
  //     if (!selecting) {
  //       setSelecting(true);
  //     }
  //     // console.log("selection", newList);
  //   }
  // }
  return (
    <NotesScreen
      screen="openIndex"
      screenNotes={openNotes}
      screenNotesSetter={setOpenNotes}
      screenTitle={"All notes"}
      url={"notes"}
    />

    //   <View style={setStyle("container", styles, colors)}>
    //     <FlatList
    //       data={openNotes}
    //       keyExtractor={(item) => item.id.toString()}
    //       numColumns={2}
    //       columnWrapperStyle={styles.row}
    //       renderItem={({ item }) => {
    //         const isSelected = selectedNotes.includes(item.id);
    //         return (
    //           <View
    //             style={
    //               isSelected
    //                 ? [styles.singleNote, colors.selected]
    //                 : [styles.singleNote, colors.notSelected]
    //             }
    //           >
    //             <Pressable
    //               onPress={
    //                 selecting
    //                   ? () => toggleSelection(item.id)
    //                   : () => router.push(`notes/${item.id}/view`)
    //               }
    //               onLongPress={() => toggleSelection(item.id)}
    //               style={styles.box}
    //             >
    //               <View>
    //                 <Text style={setStyle("title", styles, colors)}>
    //                   {item.title}
    //                 </Text>
    //                 {/* <Text style={setStyle("text", styles, colors)}>
    //                   {item.body}
    //                 </Text> */}
    //                 <RenderHtml
    //                   source={{ html: item.body }}
    //                   contentWidth={200}
    //                 />
    //               </View>
    //             </Pressable>
    //           </View>
    //         );
    //       }}
    //     />
    //     <View style={setStyle("buttonContainer", styles, colors)}>
    //       <View style={setStyle("addButton", styles, colors)}>
    //         <Link href="notes/new_note/" asChild>
    //           <Pressable>
    //             <View>
    //               <Text style={setStyle("addButtonText", styles, colors)}>
    //                 +
    //               </Text>
    //             </View>
    //           </Pressable>
    //         </Link>
    //       </View>
    //     </View>
    //   </View>
    // </>
  );
}
