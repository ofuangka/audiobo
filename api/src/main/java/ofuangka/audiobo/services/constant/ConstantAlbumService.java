package ofuangka.audiobo.services.constant;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import ofuangka.audiobo.domain.Album;
import ofuangka.audiobo.services.AlbumService;

public class ConstantAlbumService implements AlbumService {

	@Override
	public List<Album> all() {
		List<Album> ret = new ArrayList<>();
		Album album = new Album();
		album.setId("0");
		album.setArtist("Clint Mansell");
		album.setTitle("The Fountain");
		album.setSongIds(Arrays.asList(new String[] { "0" }));
		ret.add(album);
		return ret;
	}

}
