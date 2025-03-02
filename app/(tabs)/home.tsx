import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { UnsplashPhoto, getPhotos } from "@/services/postsService";
import { useAuth } from "@/utils/authContext";
import { SFProText } from "@/components/StyledText";

const Home = () => {
    const { colors } = useTheme();
    const { user } = useAuth();
    const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    const fetchPhotos = async (pageNum = 1, refresh = false) => {
        try {
            if (refresh) {
                setRefreshing(true);
            } else if (pageNum === 1) {
                setLoading(true);
            }
            
            const data = await getPhotos(pageNum);
            
            if (refresh || pageNum === 1) {
                setPhotos(data);
            } else {
                setPhotos(prev => [...prev, ...data]);
            }
            
            setPage(pageNum);
            setError("");
        } catch (err) {
            setError("Failed to load photos. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    const renderPhoto = ({ item }: { item: UnsplashPhoto }) => (
        <View style={[styles.photoContainer, { backgroundColor: colors.card }]}>
            <View style={styles.userContainer}>
                <Image 
                    source={{ uri: item.user.profile_image.medium }}
                    style={styles.avatar}
                />
                <Text style={[styles.username, { color: colors.text }]}>{item.user.name}</Text>
            </View>

            <Image 
                source={{ uri: item.urls.regular }}
                style={styles.photo}
                resizeMode="cover"
            />

            <View style={styles.photoFooter}>
                <Text style={[styles.likes, { color: colors.text }]}>♥ {item.likes} likes</Text>
                {item.description && (
                    <Text style={[styles.description, { color: colors.text }]}>{item.description}</Text>
                )}
            </View>
        </View>
    );

    const handleRefresh = () => {
        fetchPhotos(1, true);
    };

    const handleLoadMore = () => {
        if (!loading && !error) {
            fetchPhotos(page + 1);
        }
    };

    if (loading && page === 1) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <SFProText style={[styles.greeting, { color: colors.text }]}>
                    Hello, {user?.firstName || 'User'}!
                </SFProText>
            </View>

            {error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity 
                        style={[styles.retryButton, { backgroundColor: colors.primary }]}
                        onPress={() => fetchPhotos()}
                    >
                        <Text style={styles.retryText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={photos}
                    renderItem={renderPhoto}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    onRefresh={handleRefresh}
                    refreshing={refreshing}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        loading && page > 1 ? (
                            <ActivityIndicator 
                                style={styles.footerLoader} 
                                size="small" 
                                color={colors.primary} 
                            />
                        ) : null
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    greeting: {
        fontSize: 18,
        fontWeight: "600",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: 16,
    },
    retryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    retryText: {
        color: '#fff',
        fontWeight: '600',
    },
    list: {
        padding: 8,
    },
    photoContainer: {
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    username: {
        fontWeight: '600',
    },
    photo: {
        width: '100%',
        height: 300,
    },
    photoFooter: {
        padding: 12,
    },
    likes: {
        fontWeight: '600',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
    },
    footerLoader: {
        marginVertical: 16,
    }
});

export default Home;