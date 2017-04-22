package ofuangka.audiobo.services.constant;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import ofuangka.audiobo.domain.Album;
import ofuangka.audiobo.services.AlbumService;

@Service
public class ConstantAlbumService implements AlbumService {

	@Override
	public List<Album> all() {
		List<Album> ret = new ArrayList<>();
		Album album = new Album();
		album.setId("1");
		album.setArtist("Clint Mansell");
		album.setTitle("The Fountain");
		album.setSongIds(Arrays.asList(new String[] { "1" }));
		ret.add(album);
		return ret;
	}

}
