package ofuangka.audiobo.services.directory;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import ofuangka.audiobo.domain.Song;
import ofuangka.audiobo.services.SongService;

@Service
public class DirectorySongService implements SongService {

	@Inject
	private DirectoryLoadingService directoryLoadingService;

	@Override
	public List<Song> all() {
		return directoryLoadingService.getSongs();
	}

}
