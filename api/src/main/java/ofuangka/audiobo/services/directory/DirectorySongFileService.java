package ofuangka.audiobo.services.directory;

import java.io.File;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import ofuangka.audiobo.services.SongFileService;

@Service
public class DirectorySongFileService implements SongFileService {

	@Inject
	private DirectoryLoadingService directoryLoadingService;
	
	@Override
	public File get(String id) {
		return directoryLoadingService.getSongFile(id);
	}

}
