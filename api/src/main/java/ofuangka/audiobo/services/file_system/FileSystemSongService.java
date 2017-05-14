package ofuangka.audiobo.services.file_system;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import ofuangka.audiobo.domain.Song;
import ofuangka.audiobo.services.SongService;

@Service
public class FileSystemSongService implements SongService {

	@Inject
	private FileSystemLoadingService directoryLoadingService;

	@Override
	public List<Song> all() {
		return directoryLoadingService.getSongs();
	}

}
