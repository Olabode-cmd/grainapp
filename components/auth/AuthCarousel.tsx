import { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, View, Easing } from "react-native";

const { width } = Dimensions.get("window");

const images = [
    require("../../assets/images/auth/slide-1.jpg"),
    require("../../assets/images/auth/slide-2.jpg"),
    require("../../assets/images/auth/slide-3.jpg"),
    require("../../assets/images/auth/slide-4.jpg"),
];

const infiniteImages = [...images, ...images];

const ITEM_WIDTH = width * 0.45;
const SPACING = 10;
const TOTAL_WIDTH = (ITEM_WIDTH + SPACING) * infiniteImages.length;

export default function AuthCarousel() {
    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(scrollX, {
                toValue: -TOTAL_WIDTH / 2, // Move left half-way through the list
                duration: 15000, // Smooth scrolling duration (adjust for speed)
                easing: Easing.linear, // Consistent speed
                useNativeDriver: true,
            })
        ).start();
    }, []);

    return (
        <View style={{ height: ITEM_WIDTH * 1.3, overflow: "hidden" }}>
            <Animated.View
                style={{
                    flexDirection: "row",
                    transform: [{ translateX: scrollX }],
                }}
            >
                {infiniteImages.map((item, index) => (
                    <View
                        key={index}
                        style={{
                            width: ITEM_WIDTH,
                            height: ITEM_WIDTH * 1.3,
                            marginHorizontal: SPACING / 2,
                        }}
                    >
                        <Image
                            source={item}
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 10,
                                objectFit: "cover",
                            }}
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </Animated.View>
        </View>
    );
}
