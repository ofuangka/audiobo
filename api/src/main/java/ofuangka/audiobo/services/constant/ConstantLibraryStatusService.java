package ofuangka.audiobo.services.constant;

import org.springframework.stereotype.Service;

import ofuangka.audiobo.domain.LibraryStatus;
import ofuangka.audiobo.services.LibraryStatusService;

@Service
public class ConstantLibraryStatusService implements LibraryStatusService {

	@Override
	public LibraryStatus get() {
		return LibraryStatus.READY;
	}

}
