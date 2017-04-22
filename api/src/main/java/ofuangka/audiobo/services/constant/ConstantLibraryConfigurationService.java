package ofuangka.audiobo.services.constant;

import org.springframework.stereotype.Service;

import ofuangka.audiobo.domain.LibraryConfiguration;
import ofuangka.audiobo.services.LibraryConfigurationService;

@Service
public class ConstantLibraryConfigurationService implements LibraryConfigurationService {

	@Override
	public LibraryConfiguration get() {
		LibraryConfiguration ret = new LibraryConfiguration();

		return ret;
	}

	@Override
	public LibraryConfiguration update(LibraryConfiguration newValue) {
		return newValue;
	}

}
