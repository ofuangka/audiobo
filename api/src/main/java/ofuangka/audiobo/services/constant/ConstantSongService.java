package ofuangka.audiobo.services.constant;

import java.util.ArrayList;
import java.util.List;

import ofuangka.audiobo.domain.Song;
import ofuangka.audiobo.services.SongService;

public class ConstantSongService implements SongService {

	@Override
	public List<Song> all() {
		List<Song> ret = new ArrayList<>();

		Song song = new Song();
		song.setAlbumId("1");
		song.setArtist("Clint Mansell");
		song.setDuration(333);
		song.setId("1");
		song.setTitle("The Last Man");
		song.setTrack(1);

		ret.add(song);

		return ret;
	}

}
