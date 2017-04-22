package ofuangka.audiobo.services;

import ofuangka.audiobo.domain.LibraryConfiguration;

public interface LibraryConfigurationService {

	LibraryConfiguration get();
	
	LibraryConfiguration update(LibraryConfiguration newValue);
}
