package ofuangka.audiobo.services.file_system;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jaudiotagger.audio.AudioFile;
import org.jaudiotagger.audio.AudioFileIO;
import org.jaudiotagger.audio.AudioHeader;
import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.tag.TagException;
import org.springframework.stereotype.Service;

import ofuangka.audiobo.domain.Album;
import ofuangka.audiobo.domain.LibrarySetup;
import ofuangka.audiobo.domain.Song;
import ofuangka.audiobo.services.LibrarySetupService;

@Service
public class FileSystemLoadingService {

	private final Log log = LogFactory.getLog(FileSystemLoadingService.class);

	private static final Pattern TRACK_SONG_REGEX = Pattern.compile("(\\d+) - (.+)\\.mp3");
	private static final Pattern TRACK_ARTIST_SONG_REGEX = Pattern.compile("(\\d+) - (.+) - (.+)\\.mp3");

	private List<Album> albums = new ArrayList<Album>();
	private List<Song> songs = new ArrayList<Song>();
	private Map<String, File> songFiles = new HashMap<>();

	@Inject
	private LibrarySetupService librarySetupService;

	@PostConstruct
	public void loadAlbumsAndSongs() {

		LibrarySetup librarySetup = librarySetupService.get();
		for (String path : librarySetup.getPaths()) {

			/* read the artists */
			File[] rawArtists = null;
			File pathAsFile = new File(path);
			if (pathAsFile.isDirectory()) {
				rawArtists = pathAsFile.listFiles();
			} else {
				rawArtists = new File[0];
			}

			/* read the albums for each artist */
			int albumCounter = 0, songCounter = 0;
			for (File rawArtist : rawArtists) {
				if (rawArtist.isDirectory()) {
					File[] rawAlbums = rawArtist.listFiles();

					/* read the tracks for each album */
					for (File rawAlbum : rawAlbums) {
						String albumId = String.valueOf(albumCounter);
						File[] rawSongs = rawAlbum.listFiles();
						if (rawSongs.length > 0) {
							Album album = new Album();
							album.setId(albumId);
							album.setTitle(rawAlbum.getName());
							album.setArtist(rawArtist.getName());
							List<String> songIds = new ArrayList<>();
							for (File rawSong : rawSongs) {

								String name = rawSong.getName();
								Matcher trackArtistSong = TRACK_ARTIST_SONG_REGEX.matcher(name);
								Matcher trackSong = TRACK_SONG_REGEX.matcher(name);

								if (trackArtistSong.matches() || trackSong.matches()) {
									try {
										AudioFile audioFile = AudioFileIO.read(rawSong);
										AudioHeader header = audioFile.getAudioHeader();
										int trackLength = header.getTrackLength();
										String songId = String.valueOf(songCounter);
										if (trackArtistSong.matches()) {
											songs.add(getSongInstance(songId, albumId,
													Integer.valueOf(trackArtistSong.group(1)), trackArtistSong.group(3),
													trackArtistSong.group(2), trackLength));

										} else if (trackSong.matches()) {
											songs.add(getSongInstance(songId, albumId,
													Integer.valueOf(trackSong.group(1)), trackSong.group(2),
													rawArtist.getName(), trackLength));
										}
										songIds.add(songId);
										songFiles.put(songId, rawSong);
										songCounter++;
									} catch (CannotReadException e) {
										log.error("CannotReadException occurred", e);
									} catch (IOException e) {
										log.error("IOException occurred", e);
									} catch (TagException e) {
										log.error("TagException occurred", e);
									} catch (ReadOnlyFileException e) {
										log.error("ReadOnlyFileException occurred", e);
									} catch (InvalidAudioFrameException e) {
										log.error("InvalidAudioFrameException occurred", e);
									}
								}
							}
							album.setSongIds(songIds);
							albums.add(album);
							albumCounter++;
						}
					}
				}
			}
		}
	}

	public List<Album> getAlbums() {
		return albums;
	}

	public List<Song> getSongs() {
		return songs;
	}

	public Song getSongInstance(String id, String albumId, int track, String title, String artist, int duration) {
		Song ret = new Song();
		ret.setId(id);
		ret.setAlbumId(albumId);
		ret.setTrack(track);
		ret.setTitle(title);
		ret.setArtist(artist);
		ret.setDuration(duration);
		return ret;
	}

	public File getSongFile(String id) {
		return songFiles.get(id);
	}

}
