package ofuangka.audiobo.services.directory;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.springframework.stereotype.Service;

import ofuangka.audiobo.domain.Album;
import ofuangka.audiobo.domain.LibrarySetup;
import ofuangka.audiobo.domain.Song;
import ofuangka.audiobo.services.LibrarySetupService;

@Service
public class DirectoryLoadingService {

	private static final Pattern TRACK_SONG_REGEX = Pattern.compile("(\\d+) - (.+)\\.mp3");
	private static final Pattern TRACK_ARTIST_SONG_REGEX = Pattern.compile("(\\d+) - (.+) - (.+)\\.mp3");

	private Random random = new Random(System.currentTimeMillis());

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

						Album album = new Album();
						album.setId(albumId);
						album.setTitle(rawAlbum.getName());
						album.setArtist(rawArtist.getName());
						List<String> songIds = new ArrayList<>();
						File[] rawSongs = rawAlbum.listFiles();
						for (File rawSong : rawSongs) {

							String name = rawSong.getName();
							Matcher trackArtistSong = TRACK_ARTIST_SONG_REGEX.matcher(name);
							Matcher trackSong = TRACK_SONG_REGEX.matcher(name);

							if (trackArtistSong.matches() || trackSong.matches()) {
								String songId = String.valueOf(songCounter);
								if (trackArtistSong.matches()) {
									songs.add(getSongInstance(songId, albumId,
											Integer.valueOf(trackArtistSong.group(1)), trackArtistSong.group(3),
											trackArtistSong.group(2), random.nextInt(500)));

								} else if (trackSong.matches()) {
									songs.add(getSongInstance(songId, albumId, Integer.valueOf(trackSong.group(1)),
											trackSong.group(2), rawArtist.getName(), random.nextInt(500)));
								}
								songIds.add(songId);
								songFiles.put(songId, rawSong);
								songCounter++;
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
