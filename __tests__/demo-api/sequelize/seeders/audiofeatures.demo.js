'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        // return queryInterface.bulkInsert(
        //     'SpotifyTrackAudioFeatures',
        //     [
        //         {   
        //             spotifyTrack: 1,
        //             id: 1,
        //             spotifyTrackIdReference: '5CLGzJsGqhCEECcpnFQA8x', // Jess Glyn - These Days
        //             acousticness: 0.69,
        //             danceability: 0.69,
        //             energy: 0.69,
        //             instrumentalness: 0.69,
        //             key: 0.69,
        //             liveness: 0.69,
        //             loudness: 0.69,
        //             mode: 1,
        //             speechiness: 0.69,
        //             tempo: 0.69,
        //             timeSignature: 4,
        //             valence: 0.69,
        //             durationMs: 0.69
        //         },
        //         {
        //             spotifyTrack: 2,
        //             id: 2,
        //             spotifyTrackIdReference: '58q2HKrzhC3ozto2nDdN4z', // Cardi B - I Like It
        //             acousticness: 0.69,
        //             danceability: 0.69,
        //             energy: 0.69,
        //             instrumentalness: 0.69,
        //             key: 0.69,
        //             liveness: 0.69,
        //             loudness: 0.69,
        //             mode: 1,
        //             speechiness: 0.69,
        //             tempo: 0.69,
        //             timeSignature: 4,
        //             valence: 0.69,
        //             durationMs: 0.69
        //         }
        //     ],
        //     {}
        // )
    },
    down: (queryInterface, Sequelize) => {
        // return queryInterface.bulkDelete('Spotify Track Audio Features', null, {})
    }
}
