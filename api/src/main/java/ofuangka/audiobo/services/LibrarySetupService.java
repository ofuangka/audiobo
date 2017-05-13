package ofuangka.audiobo.services;

import ofuangka.audiobo.domain.LibrarySetup;

public interface LibrarySetupService {

	LibrarySetup get();
	
	LibrarySetup update(LibrarySetup newValue);
}
