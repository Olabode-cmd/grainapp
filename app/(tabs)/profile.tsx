import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "@/utils/authContext";
import { useTheme } from "@react-navigation/native";
import { SFProText, SpaceMono } from "@/components/StyledText";

const Profile = () => {
    const { user, signOut } = useAuth();
    const { colors } = useTheme();

    const handleSignOut = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Sign Out",
                    style: "destructive",
                    onPress: () => signOut()
                }
            ]
        );
    };

    if (!user) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.text }}>Loading profile...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.card }]}>
                <Image 
                    source={{ uri: user.image || 'https://via.placeholder.com/150' }}
                    style={styles.profileImage}
                />
                <SFProText style={[styles.name, { color: colors.text }]}>
                    {user.firstName} {user.lastName}
                </SFProText>
                <Text style={[styles.username, { color: colors.text }]}>@{user.username}</Text>
            </View>

            <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: colors.text }]}>Email</Text>
                    <Text style={[styles.infoValue, { color: colors.text }]}>{user.email}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: colors.text }]}>Gender</Text>
                    <Text style={[styles.infoValue, { color: colors.text }]}>{user.gender}</Text>
                </View>
            </View>

            <TouchableOpacity 
                style={[styles.signOutButton, { backgroundColor: colors.primary }]}
                onPress={handleSignOut}
            >
                <SpaceMono style={styles.signOutText}>SIGN OUT</SpaceMono>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 24,
        marginBottom: 24,
        borderRadius: 12,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 4,
    },
    username: {
        fontSize: 16,
        opacity: 0.7,
    },
    infoSection: {
        marginBottom: 24,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 16,
    },
    signOutButton: {
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 24,
    },
    signOutText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Profile;