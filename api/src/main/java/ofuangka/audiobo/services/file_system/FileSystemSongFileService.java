package ofuangka.audiobo.services.file_system;

import java.io.File;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import ofuangka.audiobo.services.SongFileService;

@Service
public class FileSystemSongFileService implements SongFileService {

	@Inject
	private FileSystemLoadingService fileSystemLoadingService;
	
	@Override
	public File get(String id) {
		return fileSystemLoadingService.getSongFile(id);
	}

}
