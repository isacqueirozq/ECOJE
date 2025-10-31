import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
// import axios from 'axios';

interface VideoItem {
    id: string;
    url: string;
    title: string;
    status: 'pending' | 'downloading' | 'completed' | 'error';
}

export default function Midias() {
    const [videoUrl, setVideoUrl] = useState('');
    const [videos, setVideos] = useState<VideoItem[]>([]);

    const addVideo = () => {
        if (!videoUrl) return;

        // Validate YouTube URL
        if (!videoUrl.includes('youtube.com/') && !videoUrl.includes('youtu.be/')) {
            alert('Please enter a valid YouTube URL');
            return;
        }

        const newVideo: VideoItem = {
            id: Date.now().toString(),
            url: videoUrl,
            title: 'Loading...',
            status: 'pending',
        };

        setVideos([...videos, newVideo]);
        setVideoUrl('');

        // Aqui você normalmente faria uma chamada à API do seu backend
        // This is a placeholder for demonstration
        handleDownload(newVideo);
    };

    const handleDownload = async (video: VideoItem) => {
        try {
            // Update status to downloading
            updateVideoStatus(video.id, 'downloading');

            // This is where you would make an API call to your backend service
            // Example API call (replace with your actual backend endpoint):
            // const response = await axios.post('YOUR_BACKEND_URL/download', { url: video.url });
            
            // Simulating API delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            updateVideoStatus(video.id, 'completed');
        } catch (error) {
            console.error('Download error:', error);
            updateVideoStatus(video.id, 'error');
        }
    };

    const updateVideoStatus = (id: string, status: VideoItem['status']) => {
        setVideos(prevVideos =>
            prevVideos.map(video =>
                video.id === id ? { ...video, status } : video
            )
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={videoUrl}
                    onChangeText={setVideoUrl}
                    placeholder="Enter YouTube video URL"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.addButton} onPress={addVideo}>
                    <Text style={styles.buttonText}>Add Video</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={videos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.videoItem}>
                        <Text style={styles.videoUrl}>{item.url}</Text>
                        <Text style={styles.status}>{item.status}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    videoItem: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    },
    videoUrl: {
        fontSize: 14,
        marginBottom: 5,
    },
    status: {
        fontSize: 12,
        color: '#666',
        fontStyle: 'italic',
    },
});