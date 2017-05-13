package ofuangka.audiobo.services.constant;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import ofuangka.audiobo.domain.LibrarySetup;
import ofuangka.audiobo.services.LibrarySetupService;

@Service
public class ConstantLibrarySetupService implements LibrarySetupService {

	private static final String ROOT_PATH = "/home/ofuangka/Music";
	
	@Override
	public LibrarySetup get() {
		LibrarySetup ret = new LibrarySetup();
		List<String> paths = new ArrayList<String>();
		paths.add(ROOT_PATH);
		ret.setPaths(paths);
		return ret;
	}

	@Override
	public LibrarySetup update(LibrarySetup newValue) {
		return newValue;
	}

}
