package ofuangka.audiobo.services.constant;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import ofuangka.audiobo.domain.LibraryConfiguration;
import ofuangka.audiobo.services.LibraryConfigurationService;

@Service
public class ConstantLibraryConfigurationService implements LibraryConfigurationService {

	private static final String ROOT_PATH = "/home/ofuangka/Music";
	
	@Override
	public LibraryConfiguration get() {
		LibraryConfiguration ret = new LibraryConfiguration();
		List<String> paths = new ArrayList<String>();
		paths.add(ROOT_PATH);
		ret.setPaths(paths);
		return ret;
	}

	@Override
	public LibraryConfiguration update(LibraryConfiguration newValue) {
		return newValue;
	}

}
