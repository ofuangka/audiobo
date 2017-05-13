package ofuangka.audiobo.services;

import java.io.File;

import org.springframework.stereotype.Service;

@Service
public class FolderValidityService {
	public boolean isValid(String path) {
		return new File(path).exists();
	}
}
