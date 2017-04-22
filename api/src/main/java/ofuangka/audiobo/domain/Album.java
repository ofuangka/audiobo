package ofuangka.audiobo.domain;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Album {

	private String id;
	private String title;
	private String artist;
	private List<String> songIds;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public List<String> getSongIds() {
		return new ArrayList<>(songIds);
	}

	public void setSongIds(List<String> songIds) {
		this.songIds = new ArrayList<>(songIds);
	}
}
